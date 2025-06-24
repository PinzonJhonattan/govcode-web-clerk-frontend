import {TableColumn} from "@vex/interfaces/table-column.interface";
import {APP_ROLES_PERMISSIONS} from "@core/constants/permissions";

export const columnsManageUsers: TableColumn<any>[] = [
  {
    label: "Usuario",
    property: "username",
    type: "text",
    visible: true,
  },
  {
    label: "Nombre",
    property: "firstName",
    type: "text",
    visible: true,
  },
  {
    label: "Apellido",
    property: "lastName",
    type: "text",
    visible: true,
  },
  {
    label: "Correo",
    property: "email",
    type: "text",
    visible: true,
  },
  {
    label: "Reestablecer contraseña",
    property: "resetPassword",
    type: "button",
    buttonIcon: "mat:vpn_key",
    visible: true,
    permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_CLERK_USERS],

  },
  {
    label: "Ver Roles",
    property: "viewRoles",
    type: "button",
    action: 'viewRolesUser',
    buttonIcon: "mat:face",
    visible: true,
  },
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
    permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_CLERK_USERS],
  },
  {
    label: "Editar",
    property: "edit",
    type: "button",
    buttonIcon: "mat:edit",
    visible: true,
    permissions: [APP_ROLES_PERMISSIONS.APP_EDIT_CLERK_USERS],
  },
  {
    label: "Eliminar",
    property: "delete",
    type: "button",
    action: 'removeUser',
    buttonIcon: "mat:delete",
    visible: true,
    permissions: [APP_ROLES_PERMISSIONS.APP_DELETE_CLERK_USERS]
  }
];
