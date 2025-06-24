import { TableColumn } from "@vex/interfaces/table-column.interface";

export const columnLegalRepresentativeTypes: TableColumn<any>[] = [
    {
        label: 'Nombre',
        property: 'name',
        type: 'text',
        visible: true,
    },
    {
        label: "Editar",
        property: "edit",
        type: "button",
        visible: true,
        buttonIcon: "mat:edit"
    },
    {
        label: "Ver",
        property: "review",
        type: "button",
        visible: true,
        buttonIcon: "mat:remove_red_eye",
    },
    {
        label: "Eliminar",
        property: "delete",
        type: "button",
        visible: true,
        buttonIcon: "mat:delete",
    },
]