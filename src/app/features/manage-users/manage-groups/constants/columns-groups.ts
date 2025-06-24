import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnsGroups = [
  {
    label: "Nombre de grupo",
    property: "name",
    type: "text",
    visible: true
  },
  {
    label: "Ruta",
    property: "path",
    type: "text",
    visible: true
  },
  {
    label: "N° Subgrupos",
    property: "subGroupCount",
    type: "text",
    visible: true
  },
  {
    label: 'Mover grupo',
    property: "move",
    type: "button",
    visible: true,
    action: 'moveGroup',
    buttonIcon: "mat:send",
    permissions : [APP_ROLES_PERMISSIONS.APP_EDIT_GROUPS]
  },
  {
    label: 'Editar grupo',
    property: "enabled",
    type: "button",
    visible: true,
    action : 'editGroup',
    buttonIcon: "mat:edit",
    permissions : [APP_ROLES_PERMISSIONS.APP_EDIT_GROUPS]
  },
  {
    label: "Eliminar grupo",
    property: "delete",
    type: "button",
    action : 'deleteGroup',
    buttonIcon: "mat:delete",
    visible: true,
    permissions : [APP_ROLES_PERMISSIONS.APP_DELETE_GROUPS]
  },
  {
    label: "Ver grupo",
    property: "view",
    type: "button",
    action : 'goToGroup',
    buttonIcon: "mat:remove_red_eye",
    visible: true,
  }
];
