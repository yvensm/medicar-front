import { AuthService } from './../auth.service';
import { UserRegister } from './user-register.model';
import { User } from './../auth.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  viewPassword = false;
  user: UserRegister;
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.user = <UserRegister>{};
    this.registerForm = <FormGroup>{};

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['']);
  }

  toggleViewPassword() {
    this.viewPassword = !this.viewPassword;
  }
  getErrorMessage(key: string): void {}

  register(): void {
    if (this.registerForm.status == 'VALID') {
      if (
        this.registerForm.value.password !=
        this.registerForm.value.password_confirm
      ) {
        this.authService.showMessage('As senhas devem ser iguais', true);
        return;
      }
      this.authService.register(this.registerForm.value).subscribe(async () => {
        await this.authService.showMessage('Usuario cadastrado com sucesso!');
        this.router.navigate(['']);
      });
    }
  }
}
