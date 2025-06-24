import { TableColumn } from "@vex/interfaces/table-column.interface";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnAdminLists: TableColumn<any>[] = [
  {
    label: "Nombre",
    property: "name",
    type: "text",
    visible: true,
  },
  {
    label: "Datos",
    property: "edit",
    type: "button",
    visible: true,
    buttonIcon: "mat:assignment"
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    visible: true,
    buttonIcon: "mat:delete",
    permissions : [APP_ROLES_PERMISSIONS.APP_DELETE_LISTS]
  },
];

export const columnEditAdminLists: TableColumn<any>[] = [
  {
    label: "Label",
    property: "label",
    type: "text",
    visible: true,
  },
  {
    label: "Valor",
    property: "value",
    type: "text",
    visible: true,
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    visible: true,
    buttonIcon: "mat:delete",
    permissions: [APP_ROLES_PERMISSIONS.APP_DELETE_LISTS]
  },
  // {
  //   label: "Editar nombre",
  //   property: "actions",
  //   type: "button",
  //   visible: true,
  //   buttonIcon: "mat:edit",
  //   permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_LISTS]
  // }
  {
    label: "Editar nombre",
    property: "edit",
    type: "button",
    visible: true,
    buttonIcon: "mat:edit",
    action: "editName",
    permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_LISTS]
  }
];
