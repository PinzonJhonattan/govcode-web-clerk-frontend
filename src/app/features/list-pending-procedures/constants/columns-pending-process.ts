export const columnsPendingProcess = [
  {
    label: "Aviso",
    property: "daysToExpireColor",
    type: "text",
    visible: true,
  },
  {
    label: "Tarea",
    property: "name",
    type: "text",
    visible: true,
  },
  {
    label: "Proceso",
    property: "processDefinitionId",
    type: "text",
    visible: true,
  },
  // {
  //   label: "Número de expediente",
  //   property: "proceedingId",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Asignación",
  //   property: "assignee",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Rol Asignado",
  //   property: "assigneeRole",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Fecha de auto inicio",
  //   property: "dateAutoStart",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Tipo de procedimiento",
  //   property: "typeProcedure",
  //   type: "text",
  //   visible: true,
  // },
  {
    label: "Tipo de solicitud",
    property: "typeRequest",
    type: "text",
    visible: true,
  },
  // {
  //   label: "Proyecto",
  //   property: "nameProject",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Caducado",
  //   property: "expired",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Días disponibles",
  //   property: "daysToExpire",
  //   type: "text",
  //   visible: true,
  // },
  // {
  //   label: "Fecha de Rádicación",
  //   property: "created",
  //   type: "text",
  //   visible: true,
  // },
  {
    label: "Ver más",
    property: "modal",
    type: "button",
    action : "viewProcedure",
    visible: true,
    buttonIcon: "mat:visibility"
  },
  {
    label: "Revisar",
    property: "review",
    type: "button",
    visible: true,
    // titleButton: "Revisar",
    buttonIcon: "mat:edit"
  }
];
