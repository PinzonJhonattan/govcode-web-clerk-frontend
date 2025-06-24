import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item.interface';

@Component({
  selector: 'vex-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  items: NavigationItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.subscription.add(
      this.navigationService.items$.subscribe(items => {
        this.items = items;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
