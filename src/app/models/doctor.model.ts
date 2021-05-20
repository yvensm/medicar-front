import { Specialty } from './specialty.model';
export interface Doctor {
  id?: number;
  crm: string;
  nome: string;
  especialidade: Specialty;
}
