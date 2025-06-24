import { APP_INITIALIZER } from '@angular/core';
import { NavigationService } from '@vex/services/navigation.service';
import { MenuService } from './core/services/menu.service';
import { firstValueFrom } from 'rxjs';

export function initializeNavigation(
  menuService: MenuService,
  navigationService: NavigationService
) {
  return () => {
    const cachedMenu = localStorage.getItem('navigationItems');
    if (cachedMenu) {
      try {
        navigationService.items = JSON.parse(cachedMenu);
      } catch (e) {
        console.error('Error parsing cached menu', e);
      }
    }

    return firstValueFrom(menuService.getMenu())
      .then(menuData => {
        const transformedMenu = menuData.children.map(item => {
          return mapMenuItem(item);
        });
        navigationService.items = transformedMenu;
        localStorage.setItem('navigationItems', JSON.stringify(transformedMenu));
        return true;
      })
      .catch(error => {
        console.error('Failed to load menu', error);
        return cachedMenu ? true : Promise.reject(error);
      });
  };
}

function mapMenuItem(item: any) {
  const mappedItem: any = {
    label: item.label,
    route: item.route,
    type: item.type,
    icon: item.icon,
    onlyShowTo: item.onlyShowTo,
    notShowTo: item.notShowTo
  };

  if (item.type === 'form' && item.formId) {
    mappedItem.formId = item.formId;
  }

  if (item.function) {
    mappedItem.function = item.function;
  }

  if (item.badge) {
    mappedItem.badge = item.badge;
  }

  if (item.children) {
    mappedItem.children = item.children.map((child: any) => mapMenuItem(child));
  }

  return mappedItem;
}

export const appInitializers = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeNavigation,
    deps: [MenuService, NavigationService],
    multi: true,
  },
];
