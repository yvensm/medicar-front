import { SnackbarService } from './../../../services/snackbar.service';
import {
  Appointment,
  AppointmentBody,
} from './../../../models/appointment.model';
import { DoctorAppointmentBook } from './../../../models/doctor-appointment-book.model';
import { Doctor } from './../../../models/doctor.model';
import { Specialty } from './../../../models/specialty.model';
import { AppointmentService } from './../appointment.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
})
export class AppointmentCreateComponent implements OnInit {
  especialidades: Specialty[];
  medicos: Doctor[];
  agenda: DoctorAppointmentBook[];
  horarios: string[];

  appointment: AppointmentBody;
  constructor(
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<AppointmentCreateComponent>,
    private snackBarService: SnackbarService
  ) {
    this.especialidades = [];
    this.medicos = [];
    this.agenda = [];
    this.horarios = [];
    this.appointment = <AppointmentBody>{};
  }

  ngOnInit(): void {
    this.appointmentService.readEspecialidades().subscribe((especialidades) => {
      this.especialidades = especialidades;
    });
  }

  especialidadesChange(value: number) {
    this.appointmentService
      .readMedicoByEspecialidade(value)
      .subscribe((medicos) => (this.medicos = medicos));
  }

  medicoChange(value: number) {
    this.appointmentService
      .readAgendaByMedico(value)
      .subscribe((agenda) => (this.agenda = agenda));
  }
  dataChange(value: number) {
    this.horarios = <string[]>(
      this.agenda.find((data) => data.id == value)?.horarios
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }

  createAppointment() {
    // console.log(this.appointment);
    this.appointmentService
      .storeAppointment(this.appointment)
      .subscribe((response: Appointment) => {
        const newAppoints = [...this.appointmentService.appointments];
        newAppoints.push(response);
        this.appointmentService.appointments = newAppoints;
        this.snackBarService.showMessage('Consulta agendada com sucesso!');
        this.closeDialog();
      });
  }
}
