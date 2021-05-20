import { Doctor } from './doctor.model';

export interface Appointment {
  id?: number;
  dia: string;
  horario: string;
  data_agendamento: string;
  medico: Doctor;
}

export interface AppointmentBody {
  agenda_id: number;
  horario: string;
}
