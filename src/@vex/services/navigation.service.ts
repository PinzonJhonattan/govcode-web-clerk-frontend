import { Injectable } from '@angular/core';
import { NavigationDropdown, NavigationItem, NavigationLink, NavigationModal, NavigationSubheading, NavigationForm } from '../interfaces/navigation-item.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _itemsSubject = new BehaviorSubject<NavigationItem[]>([]);
  items$ = this._itemsSubject.asObservable();

  get items(): NavigationItem[] {
    return this._itemsSubject.getValue();
  }

  set items(value: NavigationItem[]) {

    console.log("Set Items recibidos:", value);

    value.forEach(item => {
      console.log(`Tipo: ${item.type}`, item);
    });

    const hasAdminRole = true;

    if (hasAdminRole && value.length > 0) {
      const adminSection = value.find(item =>
        item.type === 'dropdown' && item.label === 'Administración'
      ) as NavigationDropdown;

      if (adminSection && adminSection.children) {
        const hasMenuEditor = adminSection.children.some(
          item => item.type === 'link' && item.label === 'Editor de Menú'
        );

        if (!hasMenuEditor) {
          adminSection.children.push({
            type: 'link',
            label: 'Editor de Menú',
            icon: 'mat:menu',
            route: '/admin/menu-editor',
            function: 'openMenuEditor',
            routerLinkActiveOptions: { exact: true }
          } as NavigationLink);
        }
      }
    }

    this._itemsSubject.next(value);
  }

  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  constructor() {
    const cachedMenu = localStorage.getItem('navigationItems');
    if (cachedMenu) {
      try {
        const parsedMenu = JSON.parse(cachedMenu);
        this.items = parsedMenu;
        console.log('Menu cargado desde cache:', parsedMenu);
      } catch (e) {
        console.error('Error parsing cached menu', e);
      }
    }
  }

  triggerOpenChange(item: NavigationDropdown) {
    this._openChangeSubject.next(item);
  }

  isLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'link';
  }

  isDropdown(item: NavigationItem): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  isSubheading(item: NavigationItem): item is NavigationSubheading {
    return item.type === 'subheading';
  }

  // isForm(item: NavigationItem): item is NavigationForm {
  //   const result = item && item.type === 'form';

  //   if (result) {
  //     if (!item.formId && item.route && typeof item.route === 'string') {
  //       console.log('Form detectado sin formId, asignando valor desde la ruta:', item);

  //       const formIdFromRoute = item.route.split('/formularios/')[1];

  //       if (formIdFromRoute) {
  //         item.formId = formIdFromRoute;
  //         console.log('FormId asignado:', item.formId);
  //       } else {
  //         console.log('No se pudo extraer formId de la ruta:', item.route);
  //       }
  //     }

  //     console.log('Form detectado con contenido:', item);
  //   }

  //   return result;
  // }

  isForm(item: NavigationItem): item is NavigationForm {
    console.log("Verificando tipo de item:", item); // Verificamos si el objeto tiene el tipo 'form'

    const result = item && item.type === 'form';

    // Verificación de que 'result' es verdadero y luego procesamos el formId
    if (result) {
      console.log('Es un Formulario, procesando:', item);

      if (!item.formId && item.route && typeof item.route === 'string') {
        console.log('Form detectado sin formId, asignando valor desde la ruta:', item);

        // Asegurarnos de que la ruta contiene '/formularios/'
        const formIdFromRoute = item.route.split('/formularios/')[1];

        if (formIdFromRoute) {
          item.formId = formIdFromRoute;
          console.log('FormId asignado desde ruta:', item.formId);
        } else {
          console.log('No se pudo extraer formId de la ruta:', item.route);
        }
      }

      console.log('Form detectado con contenido final:', item);
    }

    return result;
  }

  isModal(item: NavigationItem): item is NavigationModal {
    return item.type === 'modal';
  }
}
