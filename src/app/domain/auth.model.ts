import { User } from './user.model';


export interface Auth {
  user?: User;
  userId?: string;
  err?: string;
  token?: string;
}
