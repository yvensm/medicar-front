import { AuthService } from './../auth.service';
import { User } from './../auth.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  user: User;
  saveUser: boolean;
  viewPassword: boolean;
  constructor(private router: Router, private auth: AuthService) {
    this.user = <User>{};
    this.saveUser = false;
    this.viewPassword = false;
  }

  ngOnInit(): void {
    // this.loadUserFromStorate();
  }

  toggleViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }
  register(): void {
    this.router.navigate(['registrar']);
  }

  login(): void {
    this.auth.login(this.user).subscribe((token) => {
      this.auth.user = this.user;
      this.auth.token = token;
      // this.saveUserToStorage();
      this.router.navigate(['home']);
    });
  }
}
