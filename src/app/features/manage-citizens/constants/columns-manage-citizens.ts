import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnsManageCitizens = [
  {
    label: "Usuario",
    property: "username",
    type: "text",
    visible: true,
  },
  {
    label: "Razón social",
    property: "namesOrCompanyName",
    type: "text",
    visible: true,
  },
  {
    label: "Correo",
    property: "email",
    type: "text",
    visible: true,
  },
/*  {
    label: "Ver Roles",
    property: "viewRoles",
    type: "button",
    action: 'viewRolesUser',
    buttonIcon: "mat:face",
    visible: true,
  },*/
  {
    label: 'Activación',
    property: "enabled",
    type: "button",
    visible: true,
    action: 'changeEnabledStateUser',
    titleButton: (row: any) => {
      if (row.enabled) {
        return 'Desactivar'
      } else {
        return 'Activar'
      }
    },
    permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_CITIZEN_ROLES]
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    action: 'removeUser',
    buttonIcon: "mat:delete",
    visible: true,
    permissions: [APP_ROLES_PERMISSIONS.APP_DELETE_CITIZEN_ROLES]
  }
];
