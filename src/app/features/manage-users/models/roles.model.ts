export interface RolesClerk {
   id: string;
   name : string;
   description : string;
}

export interface CreateRoleClerkDTO {
  name : string;
  description : string;
}

export interface EditRoleClerkDTO {
  id: string;
  name : string;
  description : string;
}

