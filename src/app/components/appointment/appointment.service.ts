import { SnackbarService } from './../../services/snackbar.service';
import { DoctorAppointmentBook } from './../../models/doctor-appointment-book.model';
import { Doctor } from './../../models/doctor.model';
import { map } from 'rxjs/operators';
import { Specialty } from './../../models/specialty.model';
import { AuthService } from './../auth/auth.service';
import { environment } from './../../../environments/environment';
import { Observable, pipe, BehaviorSubject } from 'rxjs';
import { Appointment, AppointmentBody } from './../../models/appointment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  baseUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackbarService: SnackbarService
  ) {}

  private _appointments = new BehaviorSubject<Appointment[]>([]);

  get appointments(): Appointment[] {
    return this._appointments.value;
  }

  set appointments(appointments: Appointment[]) {
    this._appointments.next(appointments);
  }

  readConsultas(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/consultas/`, {
      headers: { Authorization: `Token ${this.auth.token}` },
    });
  }
  readEspecialidades(): Observable<Specialty[]> {
    return this.http
      .get(`${this.baseUrl}/especialidades/`, {
        headers: { Authorization: `Token ${this.auth.token}` },
      })
      .pipe(
        map((data: any): Specialty[] => {
          return <Specialty[]>data.results;
        })
      );
  }

  readMedicoByEspecialidade(id: number): Observable<Doctor[]> {
    return this.http
      .get(`${this.baseUrl}/medicos/?especialidade=${id}`, {
        headers: { Authorization: `Token ${this.auth.token}` },
      })
      .pipe(
        map((data: any) => {
          return <Doctor[]>data.results;
        })
      );
    // /medicos/?search=maria&especialidade=1
  }

  readAgendaByMedico(id: number): Observable<DoctorAppointmentBook[]> {
    return this.http
      .get(`${this.baseUrl}/agendas/?medico=${id}`, {
        headers: { Authorization: `Token ${this.auth.token}` },
      })
      .pipe(
        map((data: any) => {
          return <DoctorAppointmentBook[]>data.results;
        })
      );
  }

  storeAppointment(body: AppointmentBody): Observable<Appointment> {
    return this.http
      .post<Appointment>(`${this.baseUrl}/consultas/`, body, {
        headers: { Authorization: `Token ${this.auth.token}` },
      })
      .pipe(
        map((obj: any) => {
          if (obj.message) {
            this.snackbarService.showMessage(obj.message, true);
            return <Appointment>{};
          }
          return obj;
        })
      );
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/consultas/${id}/`, {
        headers: { Authorization: `Token ${this.auth.token}` },
      })
      .pipe(
        map((obj: any) => {
          if (obj.message) {
            this.snackbarService.showMessage(obj.message, true);
            return;
          }
          return;
        })
      );
  }
}
