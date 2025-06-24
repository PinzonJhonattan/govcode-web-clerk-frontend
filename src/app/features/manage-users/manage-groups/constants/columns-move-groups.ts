export const columnsMoveGroups = [
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
    label: "Entrar a grupo",
    property: "view",
    type: "button",
    action : 'goToGroup',
    buttonIcon: "mat:keyboard_arrow_right",
    visible: true,
  }
];
