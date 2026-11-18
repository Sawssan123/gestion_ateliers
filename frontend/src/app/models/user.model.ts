export interface User {
  id?: number;
  email: string;
  password?: string;
  role_type_id: number;
  roleType?: {
    id: number;
    name: string;
  };
}
import { RoleType } from './role-type.model';