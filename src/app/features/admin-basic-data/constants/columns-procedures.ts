import { TableColumn } from "@vex/interfaces/table-column.interface";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnProcedures: TableColumn<any>[] = [
  {
    label: "Nombre",
    property: "name",
    type: "text",
    visible: true,
  },
  {
    label: "Descripción de radicación",
    property: "radicateDescription",
    type: "text",
    visible: true,
  },
  {
    label: "Descripción de consulta",
    property: "consultDescription",
    type: "text",
    visible: true,
  },
  {
    label: "Rol Asignado",
    property: "role",
    type: "text",
    visible: true,
  },
  {
    label: "Editar",
    property: "edit",
    type: "button",
    visible: true,
    buttonIcon: "mat:edit",
    permissions : [APP_ROLES_PERMISSIONS.APP_EDIT_PROCEDURES]
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    visible: true,
    buttonIcon: "mat:delete",
    permissions : [APP_ROLES_PERMISSIONS.APP_DELETE_PROCEDURES]
  },
  {
    label: "Ver",
    property: "review",
    type: "button",
    visible: true,
    buttonIcon: "mat:remove_red_eye",
  },
];
