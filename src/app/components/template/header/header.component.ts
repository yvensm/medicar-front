import { User } from './../../auth/auth.model';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get username(): string {
    return this.auth.user.username;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
