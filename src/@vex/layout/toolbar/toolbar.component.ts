import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../config/config.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { PopoverService } from '../../components/popover/popover.service';
import { MegaMenuComponent } from '../../components/mega-menu/mega-menu.component';
import { Observable, of, take } from 'rxjs';

@Component({
  selector: 'vex-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() mobileQuery: boolean;

  @Input()
  @HostBinding('class.shadow-b')
  hasShadow: boolean;

  sidenavCollapsed = this.layoutService.sidenavCollapsed$;

  navigationItems = this.navigationService.items;

  isHorizontalLayout$: Observable<boolean> = this.configService.config$.pipe(map(config => config.layout === 'horizontal'));
  isVerticalLayout$: Observable<boolean> = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isNavbarInToolbar$: Observable<boolean> = this.configService.config$.pipe(map(config => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$: Observable<boolean> = this.configService.config$.pipe(map(config => config.navbar.position === 'below-toolbar'));
  userVisible$: Observable<boolean> = this.configService.config$.pipe(map(config => config.toolbar.user.visible));

  megaMenuOpen$: Observable<boolean> = of(false);
  sidenavOpen$: Observable<boolean> = of(true);

  sidenavOpenClick: boolean = false;

  showCollapsePin$ = this.configService.config$.pipe(
    map(config => config.sidenav.showCollapsePin)
  );

  constructor(private layoutService: LayoutService,
    private configService: ConfigService,
    private navigationService: NavigationService,
    private popoverService: PopoverService) { }

  ngOnInit() {

    this.layoutService.isDesktop$.subscribe({
      next: (value) => {
          setTimeout(() => {
              if (!value) {
                  this.layoutService.closeSidenav();
                  this.layoutService.collapseSidenav();
              }else{
                this.layoutService.openSidenav();
                this.layoutService.expandSidenav();
              }
          });
      }
  })

    this.layoutService.sidenavOpen$.subscribe({
      next: (value) => {
        this.sidenavOpenClick = value;
      }
    });
  }

  openQuickpanel(): void {
    this.layoutService.openQuickpanel();
  }

  openSidenav(): void {
    this.layoutService.openSidenav();
  }

  collapseCloseSidenav() {
    this.layoutService.collapseOpenSidenav();
    // this.layoutService.closeSidenav();
  }

  toggleCollapse() {
    this.sidenavCollapsed
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }

  openMegaMenu(origin: ElementRef | HTMLElement): void {
    this.megaMenuOpen$ = of(
      this.popoverService.open({
        content: MegaMenuComponent,
        origin,
        offsetY: 12,
        position: [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
        ]
      })
    ).pipe(
      switchMap(popoverRef => popoverRef.afterClosed$.pipe(map(() => false))),
      startWith(true),
    );
  }

  openSearch(): void {
    this.layoutService.openSearch();
  }

  toggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  // toggleSidenav() {
  //   console.log("this.sidenavOpenClick: ",this.sidenavOpenClick)
  //   if(this.sidenavOpenClick) {
  //     this.layoutService.closeSidenav();
  //     this.layoutService.collapseSidenav();
  //   } else {
  //     this.layoutService.openSidenav();
  //     this.layoutService.expandSidenav();
  //   }
  // }

}
