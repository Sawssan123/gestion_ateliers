import { User } from './user.model';

export interface Atelier {
  id?: number;
  titre: string;
  description: string;
  date: string;
  duree: number;
  formateur_id?: number | null;
  formateur?: User | null;
  participants?: User[];
}