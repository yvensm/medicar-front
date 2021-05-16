import { AppointmentService } from './../appointment.service';
import { Appointment } from './../../../models/appointment.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-read',
  templateUrl: './appointment-read.component.html',
  styleUrls: ['./appointment-read.component.scss'],
})
export class AppointmentReadComponent implements OnInit {
  // appointments: Appointment[];
  displayedColumns = [
    'ESPECIALIDADE',
    'PROFISSIONAL',
    'DATA',
    'HORA',
    'actions',
  ];
  constructor(private appointmentService: AppointmentService) {
    // this.appointments = [];
  }

  get appointments() {
    return this.appointmentService.appointments;
  }

  ngOnInit(): void {
    this.appointmentService.readConsultas().subscribe((appointments) => {
      this.appointmentService.appointments = appointments;
    });
  }

  especialidade(appoint: Appointment): string {
    return appoint.medico.especialidade.nome;
  }

  profissional(appoint: Appointment): string {
    return appoint.medico.nome;
  }

  data(appoint: Appointment): string {
    return appoint.dia;
  }

  hora(appoint: Appointment): string {
    return appoint.horario;
  }

  desmarcar(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      const newAppoints = [...this.appointmentService.appointments];
      let removeIdenx = 0;
      newAppoints.map((app, index) => {
        if (app.id == id) removeIdenx = index;
      });
      newAppoints.slice(removeIdenx, 1);
      this.appointmentService.appointments = newAppoints;
    });
  }
}
