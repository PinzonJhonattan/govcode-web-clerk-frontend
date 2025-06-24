export const columnsRolesGroup = [
  {
    type: "checkbox",
    property: "checkbox",
    visible: true
  },
  {
    label: "Nombre",
    property: "name",
    type: "text",
    visible: true
  },
  {
    label: "Descripción",
    property: "description",
    type: "text",
    visible: true
  },
  {
    label: "Remover del grupo",
    property: "delete",
    type: "button",
    action : 'removeRolFromGroup',
    buttonIcon: "mat:exit_to_app",
    visible: true,
  }
];
