import {RolesClerk} from "@features/manage-users/models/roles.model";

export interface User {
  name: string;
  email: string;
  username: string;
  roles: RolesClerk[];
}
