export interface Procedure {
    id: number;
    name: string;
    camundaId: string;
    radicateDescription: string;
    consultDescription: string;
    role: string;
    buttonEdit: string;
}

export type ProcedureDTO = Omit<Procedure, 'buttonEdit' | 'id'>;