export const columnsAssignTask = [
  {
    label: "Tarea",
    property: "name",
    type: "text",
    visible: true
  },
  {
    label: "Proceso",
    property: "processDefinitionId",
    type: "text",
    visible: true
  },
  {
    label: "Asignación",
    property: "assignee",
    type: "text",
    visible: true
  },
  {
    label: "Rol Asignado",
    property: "assigneeRoleDescription",
    type: "text",
    visible: true
  },
  {
    label: "Número de Radicado",
    property: "processInstanceId",
    type: "text",
    visible: true
  },
  {
    label: "Fecha de Rádicación",
    property: "created",
    type: "text",
    visible: true,
    cssClasses: ["text-secondary", "font-medium"]
  },
  {
    label: "Acciones",
    property: "actions",
    type: "button",
    visible: true,
  },
];
