import { TableColumn } from "@vex/interfaces/table-column.interface";

export const columnAuthorizedUsers: TableColumn<any>[] = [
    {
        label: 'Nombre',
        property: 'username',
        type: 'text',
        visible: true,
    },
    {
        label: 'Email',
        property: 'email',
        type: 'text',
        visible: true,
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