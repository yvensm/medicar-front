import { AppointmentCreateComponent } from './../../components/appointment/appointment-create/appointment-create.component';
import { AuthService } from './../../components/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.auth.restoreState();
  }

  openCreate() {
    this.dialog.open(AppointmentCreateComponent);
  }
}