import { TableColumn } from "@vex/interfaces/table-column.interface";

export const columnTramitesOtorgadosNegados: TableColumn<any>[] = [
    {
      label: "Radicado Bia",
      property: "RadicadoBia",
      type: "text",
      visible: true,
    },
    {
      label: "Fecha",
      property: "Fecha",
      type: "text",
      visible: true,
    },
    {
      label: "Expediente",
      property: "Expediente",
      type: "text",
      visible: true,
    },
    {
      label: "Usuario y/o entidad",
      property: "UsuarioYOEntidad",
      type: "text",
      visible: true,
    },
    {
      label: "Tipo de solicitud",
      property: "TipodeSolicitud",
      type: "text",
      visible: true,
    },
    {
      label: "Tipo de trámite",
      property: "TipodeTramite",
      type: "text",
      visible: true,
    },
    {
      label: "Municipio",
      property: "Municipio",
      type: "text",
      visible: true,
    },
    {
      label: "Resultado",
      property: "Resultado",
      type: "text",
      visible: true,
    },
]