export interface PersonTypes {
    id: number;
    name: string;
}

export type PersonTypesDTO = Omit<PersonTypes, 'id'>;

export interface ProcedureType{
    id: number;
    name: string;
}

export interface IdentificationTypes {
    id: number;
    name: string;
}

export interface LegalRepresentativeTypes {
    id: number;
    name: string;
}

export interface PropertyQualityTypes {
    id: number;
    name: string;
}

export interface WaterSources {
    id: number;
    name: string;
}

export interface DischargeTypes {
    id: number;
    name: string;
}

export interface DischargeFlowTypes {
    id: number;
    name: string;
}

export interface TypeActivities {
    id: number;
    name: string;
}