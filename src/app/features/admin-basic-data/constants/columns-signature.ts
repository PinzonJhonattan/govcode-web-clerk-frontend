import { TableColumn } from "@vex/interfaces/table-column.interface";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnSignatures: TableColumn<any>[] = [
  {
    label: "Nombre",
    property: "name",
    type: "text",
    visible: true,
  },
  {
    label: "Nombre del archivo",
    property: "filename",
    type: "text",
    visible: true,
  },
  {
    label: "Editar",
    property: "edit",
    type: "button",
    visible: true,
    buttonIcon: "mat:edit",
    permissions : [APP_ROLES_PERMISSIONS.APP_EDIT_SIGNATURES]
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    visible: true,
    buttonIcon: "mat:delete",
    permissions : [APP_ROLES_PERMISSIONS.APP_DELETE_SIGNATURES]
  },
];
