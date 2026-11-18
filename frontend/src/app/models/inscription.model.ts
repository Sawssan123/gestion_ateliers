export interface Inscription {
  user_id: number;
  atelier_id: number;
  date_inscription?: string;
  user?: User;
  atelier?: Atelier;
}

import { User } from './user.model';
import { Atelier } from './atelier.model';