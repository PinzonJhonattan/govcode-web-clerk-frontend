import {User} from "@features/manage-users/models/users.model";

export const columnsMembersGroup = [
  {
    type: "checkbox",
    property: "checkbox",
    visible: true
  },
  {
    label: "Nombre de usuario",
    property: "username",
    type: "text",
    visible: true
  },
  {
    label: "Nombre",
    property: "firstName",
    type: "text",
    visible: true
  },
  {
    label: "Apellido",
    property: "lastName",
    type: "text",
    visible: true
  },
  {
    label: "Email",
    property: "email",
    type: "text",
    visible: true
  },
  {
    label: 'Activación',
    property: "enabled",
    type: "button",
    visible: true,
    action : 'changeEnabledStateUser',
    titleButton : (row : User) => {
      if(row.enabled){
        return  'Desactivar'
      }else{
        return 'Activar'
      }
    },
  },
  {
    label: "Sacar del grupo",
    property: "delete",
    type: "button",
    action : 'removeMemberFromGroup',
    buttonIcon: "mat:exit_to_app",
    visible: true,
  }
];
