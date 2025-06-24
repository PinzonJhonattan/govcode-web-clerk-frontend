import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem, NavigationLink,NavigationForm  } from '../../interfaces/navigation-item.interface';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { MenuEditorService } from '../../../@vex/services/menu-editor.service';
import { trackByRoute } from '../../utils/track-by';

@Component({
  selector: 'vex-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {
  @Input() item: NavigationItem;

  isActive$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => (item: NavigationItem) => this.hasActiveChilds(item))
  );

  isLink = this.navigationService.isLink;
  isDropdown = this.navigationService.isDropdown;
  isSubheading = this.navigationService.isSubheading;
  isModal = this.navigationService.isModal;
  trackByRoute = trackByRoute;
  isForm = this.navigationService.isForm;


  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private menuEditorService: MenuEditorService
  ) { }

  ngOnInit() {
    console.log("hola");
  }

  hasActiveChilds(parent: NavigationItem): boolean {
    if (this.isLink(parent) || this.isForm(parent)) {
      if (this.isSpecialFunction(parent)) {
        return false;
      }
      return this.router.isActive(parent.route as string, true);
    }

    if (this.isDropdown(parent) || this.isSubheading(parent)) {
      return parent.children.some(child => {
        if (this.isDropdown(child)) {
          return this.hasActiveChilds(child);
        }
        if ((this.isLink(child) || this.isForm(child)) && !this.isFunction(child.route) && !this.isSpecialFunction(child)) {
          return this.router.isActive(child.route as string, true);
        }
        return false;
      });
    }

    return false;
  }

  isFunction(prop: NavigationLink['route']) {
    return prop instanceof Function;
  }

  isSpecialFunction(item: NavigationItem): boolean {
    return this.isLink(item) && (item as NavigationLink).function !== undefined;
  }

  handleSpecialFunction(event: MouseEvent, item: NavigationItem) {
    if (this.isSpecialFunction(item)) {
      event.preventDefault();

      const link = item as NavigationLink;
      if (link.function === 'openMenuEditor') {
        this.menuEditorService.openMenuEditor().subscribe(result => {
          if (result) {
            console.log('Menu updated successfully');
          }
        });
      }
    }
  }
  handleItemClick(event: MouseEvent, item: NavigationItem) {
    if (this.isForm(item)) {
      console.log(`Navegando al formulario: ${(item as NavigationForm).formId}`);
    } else if (this.isSpecialFunction(item)) {
      this.handleSpecialFunction(event, item);
    }
  }
}

