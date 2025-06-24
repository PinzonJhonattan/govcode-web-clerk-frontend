import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NavigationService } from '@vex/services/navigation.service';
import { MenuService } from '../../../app/core/services/menu.service';
import { JsonExampleModalComponent } from './json-example-modal.component';

@Component({
  selector: 'app-menu-editor-modal',
  templateUrl: './menu-editor-modal.component.html',
  styleUrls: ['./menu-editor-modal.component.scss']
})
export class MenuEditorModalComponent implements OnInit {
  form: FormGroup;
  originalMenu: any;
  previewMenu: any[] = [];
  jsonError: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MenuEditorModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private navigationService: NavigationService,
    private menuService: MenuService
  ) {
    this.form = this.fb.group({
      menuJson: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.originalMenu = this.data.menuData;
    this.form.get('menuJson')?.setValue(JSON.stringify(this.originalMenu, null, 2));
    this.updatePreview();
    this.form.get('menuJson')?.valueChanges.subscribe(value => {
      this.updatePreview();
    });
  }

  updatePreview() {
    try {
      const menuJson = this.form.get('menuJson')?.value;
      if (!menuJson) {
        this.jsonError = 'No JSON provided';
        this.previewMenu = [];
        return;
      }

      const parsedMenu = JSON.parse(menuJson);
      if (parsedMenu && parsedMenu.children) {
        this.previewMenu = this.transformMenuData(parsedMenu);
        this.jsonError = '';
      } else {
        this.jsonError = 'Invalid menu structure. Menu should have a "children" property.';
      }
    } catch (e) {
      console.error('Error parsing menu JSON', e);
      this.jsonError = 'Invalid JSON format';
      this.previewMenu = [];
    }
  }

  formatJson() {
    try {
      const menuJson = this.form.get('menuJson')?.value;
      if (!menuJson) {
        return;
      }

      const parsedJson = JSON.parse(menuJson);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      this.form.get('menuJson')?.setValue(formattedJson);
    } catch (e) {
      console.error('Error formatting JSON', e);
      this.jsonError = 'No se puede formatear el JSON debido a errores de sintaxis';
    }
  }

  showJsonExample() {
    const jsonExample = {
      "children": [
        {
          "id": "panel-principal",
          "label": "Panel Principal",
          "type": "subheading",
          "children": [
            {
              "id": "inicio",
              "label": "Inicio",
              "type": "link",
              "route": "/",
              "icon": "mat:home"
            },
            {
              "id": "tareas",
              "label": "Tareas Pendientes",
              "type": "link",
              "route": "/tareas",
              "icon": "mat:assignment"
            },
            {
              "id": "admin-menu",
              "label": "Administración",
              "type": "dropdown",
              "icon": "mat:settings",
              "children": [
                {
                  "id": "usuarios",
                  "label": "Usuarios",
                  "type": "link",
                  "route": "/admin/usuarios",
                  "icon": "mat:people"
                },
                {
                  "id": "configuracion",
                  "label": "Configuración",
                  "type": "dropdown",
                  "icon": "mat:tune",
                  "children": [
                    {
                      "id": "general",
                      "label": "General",
                      "type": "link",
                      "route": "/admin/config/general",
                      "icon": "mat:settings"
                    }
                  ]
                }
              ]
            },
            {
              "id": "modal-example",
              "label": "Ventana Modal",
              "type": "modal",
              "route": "/",
              "function": "openModal"
            }
          ]
        }
      ]
    };

    const exampleStr = JSON.stringify(jsonExample, null, 2);

    this.dialog.open(JsonExampleModalComponent, {
      width: '600px',
      data: { jsonExample: exampleStr }
    });
  }

  transformMenuData(menuData: any) {
    if (!menuData || !menuData.children) return [];
    return menuData.children.map((item: any) => this.mapMenuItem(item));
  }

  mapMenuItem(item: any) {
    return {
      label: item.label,
      route: item.route,
      type: item.type,
      icon: item.icon,
      function: item.function,
      children: item.children
        ? item.children.map((child: any) => this.mapMenuItem(child))
        : []
    };
  }

  getIconName(icon: string): string {
    if (!icon) return '';

    if (icon.startsWith('mat:')) {
      return icon.substring(4);
    }

    return icon;
  }

  isSvgIcon(icon: string): boolean {
    return icon && (icon.startsWith('mat:') || icon.includes(':'));
  }

  saveChanges() {
    if (this.form.invalid || this.jsonError) {
      return;
    }

    try {
      const menuJsonValue = this.form.get('menuJson')?.value;
      if (!menuJsonValue) {
        this.jsonError = 'No JSON provided';
        return;
      }

      const menuJson = JSON.parse(menuJsonValue);
      this.menuService.saveMenu(menuJson).subscribe({
        next: (response) => {
          const transformedMenu = this.transformMenuData(menuJson);
          this.navigationService.items = transformedMenu;
          localStorage.setItem('navigationItems', JSON.stringify(transformedMenu));
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error saving menu', error);
        }
      });
    } catch (e) {
      console.error('Error parsing menu JSON', e);
      this.jsonError = 'Invalid JSON format';
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
