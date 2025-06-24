
export const columnsSubgroupGroup = [
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
    label: "Ruta",
    property: "path",
    type: "text",
    visible: true
  },
  {
    label: "N° Hijos",
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
  },
  {
    label: 'Editar grupo',
    property: "enabled",
    type: "button",
    visible: true,
    action : 'editSubGroup',
    buttonIcon: "mat:edit",
  },
  {
    label: "Eliminar grupo",
    property: "delete",
    type: "button",
    action : 'deleteSubGroup',
    buttonIcon: "mat:delete",
    visible: true,
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
