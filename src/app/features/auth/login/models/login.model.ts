import { User } from "@core/models/user.model";

export interface LoginUser {
  username: string;
  password: string;
}

export interface ResponseLogin {
  access_token: string;
  user: User;
}
