import { Component, Inject, LOCALE_ID, Renderer2 } from "@angular/core";
import { ConfigService } from "@vex/config/config.service";
import { Settings } from "luxon";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { NavigationService } from "@vex/services/navigation.service";
import { LayoutService } from "@vex/services/layout.service";
import { ActivatedRoute } from "@angular/router";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SplashScreenService } from "@vex/services/splash-screen.service";
import { VexConfigName } from "@vex/config/config-name.model";
import { ColorSchemeName } from "@vex/config/colorSchemeName";
import {
  MatIconRegistry,
  SafeResourceUrlWithIconOptions,
} from "@angular/material/icon";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {
  ColorVariable,
  colorVariables,
} from "@vex/components/config-panel/color-variables";
import { UserService } from "@core/services/user.service";
import {
  ACTOR_ROLES_PERMISSIONS,
  APP_ROLES_PERMISSIONS,
} from "@core/constants/permissions";
import { MenuService } from "./core/services/menu.service";
@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private menuService: MenuService
  ) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    this.initializeMenu();

    // this.menuService.getMenu().subscribe((menuData) => {
    //   const transformedMenu = this.transformMenuData(menuData);
    //   this.navigationService.items = transformedMenu;

    //   localStorage.setItem('navigationItems', JSON.stringify(transformedMenu));
    //   console.log('menu cargado', transformedMenu);
    // });
    this.matIconRegistry.addSvgIconResolver(
      (
        name: string,
        namespace: string
      ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case "mat":
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg`
            );

          case "logo":
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/logos/${name}.svg`
            );

          case "flag":
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/flags/${name}.svg`
            );
        }
      }
    );

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has("layout")) {
        this.configService.setConfig(
          queryParamMap.get("layout") as VexConfigName
        );
      }

      if (queryParamMap.has("style")) {
        this.configService.updateConfig({
          style: {
            colorScheme: queryParamMap.get("style") as ColorSchemeName,
          },
        });
      }

      if (queryParamMap.has("primaryColor")) {
        const color: ColorVariable =
          colorVariables[queryParamMap.get("primaryColor")];

        if (color) {
          this.configService.updateConfig({
            style: {
              colors: {
                primary: color,
              },
            },
          });
        }
      }

      if (queryParamMap.has("rtl")) {
        this.configService.updateConfig({
          direction: coerceBooleanProperty(queryParamMap.get("rtl"))
            ? "rtl"
            : "ltr",
        });
      }
    });

    /**
     * Add your own routes here
     */

    // this.navigationService.items = [
    //   {
    //     type: "subheading",
    //     label: "Panel Principal",
    //     children: [
    //       {
    //         type: "link",
    //         label: "Inicio",
    //         route: "/",
    //         icon: "mat:insert_drive_file",
    //         routerLinkActiveOptions: { exact: true },
    //       },
    //       {
    //         type: "link",
    //         label: "Tareas Pendientes",
    //         route: "/tareas-pendientes",
    //         icon: "mat:insert_drive_file",
    //         routerLinkActiveOptions: { exact: true },
    //         onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_TASKS],
    //       },
    //       {
    //         type: "link",
    //         label: "Asignación de tareas",
    //         route: "/asignar-tareas",
    //         icon: "mat:assignment_turned_in",
    //         routerLinkActiveOptions: { exact: true },
    //         onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_ALL_TASK],
    //       },
    //       {
    //         type: "dropdown",
    //         label: "Administración de usuarios",
    //         icon: "mat:contact_support",
    //         onlyShowTo: [ACTOR_ROLES_PERMISSIONS.ACTOR_ADMIN],
    //         children: [
    //           {
    //             type: "dropdown",
    //             label: "Funcionarios",
    //             icon: "mat:supervisor_account",
    //             children: [
    //               {
    //                 type: "link",
    //                 label: "Usuarios",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_CLERK_USERS],
    //                 route: "/gestion-usuarios-funcionarios/usuarios",
    //                 icon: "mat:supervisor_account",
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //               {
    //                 type: "link",
    //                 label: "Roles de actor",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_CLERK_ROLES],
    //                 route: "/gestion-usuarios-funcionarios/roles-actor",
    //                 icon: "mat:supervisor_account",
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //               {
    //                 type: "link",
    //                 label: "Grupos",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_GROUPS],
    //                 route: "/gestion-usuarios-funcionarios/grupos",
    //                 icon: "mat:supervisor_account",
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //             ],
    //           },
    //           {
    //             type: "dropdown",
    //             label: "Ciudadanos",
    //             icon: "mat:supervisor_account",
    //             children: [
    //               {
    //                 type: "link",
    //                 label: "Usuarios",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_CITIZEN_USERS],
    //                 route: "/gestion-usuarios-ciudadanos/usuarios",
    //                 icon: "mat:supervisor_account",
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //               {
    //                 type: "link",
    //                 label: "Roles de actor",
    //                 route: "/gestion-usuarios-ciudadanos/roles-actor",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_CITIZEN_ROLES],
    //                 icon: "mat:supervisor_account",
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         type: "dropdown",
    //         label: "Administración",
    //         icon: "mat:person",
    //         children: [
    //           {
    //             type: "dropdown",
    //             label: "Administrar datos basicos",
    //             icon: "mat:person",
    //             children: [
    //               {
    //                 type: "link",
    //                 label: "Trámites",
    //                 icon: "mat:assignment",
    //                 route: "/admin/tramites",
    //                 routerLinkActiveOptions: { exact: true },
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_PROCEDURES],
    //               },
    //               {
    //                 type: "link",
    //                 label: "Administrar listas",
    //                 icon: "mat:assignment",
    //                 route: "/admin/admin-lists",
    //                 routerLinkActiveOptions: { exact: true },
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_LISTS],
    //               },
    //               {
    //                 type: "link",
    //                 label: "Subida de plantillas",
    //                 icon: "mat:assignment",
    //                 route: "/admin/admin-templates",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_TEMPLATES],
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //               {
    //                 type: "link",
    //                 label: "Subida de firmas digitales",
    //                 icon: "mat:assignment",
    //                 route: "/admin/admin-signatures",
    //                 onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_SIGNATURES],
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //             ],
    //           },
    //           {
    //             type: "dropdown",
    //             label: "Datos del proceso",
    //             icon: "mat:assignment_turned_in",
    //             children: [
    //               {
    //                 type: "link",
    //                 label: "Documentos del tŕamite",
    //                 route: "/datos-proceso/documentos",
    //                 icon: "mat:assignment_turned_in",
    //                 onlyShowTo: [
    //                   APP_ROLES_PERMISSIONS.APP_VIEW_HISTORY_DOCUMENTS,
    //                 ],
    //                 routerLinkActiveOptions: { exact: true },
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         type: "link",
    //         label: "Reportes",
    //         route: "reportes",
    //         icon: "mat:picture_as_pdf",
    //         onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_REPORTS],
    //         routerLinkActiveOptions: { exact: true },
    //       },
    //       {
    //         type: "modal",
    //         label: "Carga de trabajo",
    //         route: "/",
    //         onlyShowTo: [APP_ROLES_PERMISSIONS.APP_VIEW_TASK_LOAD],
    //       },
    //       /* {
    //         type: "dropdown",
    //         label: "Administrar licencias",
    //         icon: "mat:person",
    //         children: [
    //           {
    //             type: "link",
    //             label: "Usuarios autorizados",
    //             icon: "mat:assignment",
    //             route: "/manage-licenses/authorized-users",
    //             routerLinkActiveOptions: {exact: true},
    //           },
    //         ]
    //       }*/
    //     ],
    //   },
    // ];
  }
  transformMenuData(menuData: any) {
    return menuData.children.map((item) => this.mapMenuItem(item));
  }

  private initializeMenu(): void {
    this.menuService.getMenu().subscribe({
      next: (menuData) => {
        const transformedMenu = this.transformMenuData(menuData);
        this.navigationService.items = transformedMenu;
        localStorage.setItem('navigationItems', JSON.stringify(transformedMenu));
        console.log('menu cargado', transformedMenu);
      },
      error: (error) => {
        console.error('Error loading menu:', error);
        const cachedMenu = localStorage.getItem('navigationItems');
        if (cachedMenu) {
          try {
            this.navigationService.items = JSON.parse(cachedMenu);
            console.log('Loaded menu from cache');
          } catch (e) {
            console.error('Error parsing cached menu', e);
          }
        }
      }
    });
  }
  mapMenuItem(item: any) {
    const mappedItem = {
      label: item.label,
      route: item.route,
      type: item.type,
      icon: item.icon,
      children: item.children
        ? item.children.map((child) => this.mapMenuItem(child))
        : [],
    };
    return mappedItem;
  }
}
