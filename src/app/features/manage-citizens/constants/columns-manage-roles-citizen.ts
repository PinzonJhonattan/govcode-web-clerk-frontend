import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnsManageRolesCitizen = [
  {
    label: "Nombre",
    property: "name",
    type: "text",
    visible: true,
  },
  {
    label: "Descripción",
    property: "description",
    type: "text",
    visible: true,
  },
  {
    label: "Editar",
    property: "edit",
    type: "button",
    action : 'editRole',
    buttonIcon: "mat:edit",
    visible: true,
    permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_CITIZEN_ROLES]
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    visible: true,
    action : 'deleteRole',
    buttonIcon: "mat:delete",
    permissions: [APP_ROLES_PERMISSIONS.APP_DELETE_CITIZEN_ROLES]
  },
];
