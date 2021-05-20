import { Doctor } from './doctor.model';

export interface DoctorAppointmentBook {
  id: number;
  dia: string;
  medico: Doctor;
  horarios: string[];
}

