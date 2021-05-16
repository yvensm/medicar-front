import { UserRegister } from './register-form/user-register.model';
import { environment } from './../../../environments/environment';
import { User } from './auth.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/users`;

  private _token = new BehaviorSubject<string>('');

  private _user = new BehaviorSubject<User>(<User>{
    username: '',
  });

  private _authHeader = new BehaviorSubject<HttpHeaders>(<HttpHeaders>{});

  constructor(
    private snakBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snakBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  register(user: UserRegister): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/`, user).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    let message = e.error.username[0]
      ? e.error.username[0]
      : 'Ocorroreu um erro!';
    this.showMessage(message, true);
    return EMPTY;
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, user).pipe(
      map((res: any) => {
        this.setToken(res.token);
        this.setUser(user);
        let newAuthHeader = new HttpHeaders();
        newAuthHeader.append(`Authorization`, `Token ${res.token}`);
        this.authHeader = newAuthHeader;
        return res;
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this._token.next('');
    this._user.next(<User>{});

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get user(): User {
    return this._user.value;
  }

  set user(user: User) {
    this._user.next(user);
  }

  get token(): string {
    return this._token.value;
  }

  set token(token: string) {
    this._token.next(token);
  }

  get authHeader(): HttpHeaders {
    return this._authHeader.value;
  }

  set authHeader(headers: HttpHeaders) {
    this._authHeader.next(headers);
  }
  restoreState(): void {
    this.token = <string>localStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['']);
      return;
    }
    let user = <string>localStorage.getItem('user');
    this.user = <User>JSON.parse(user);
  }
}
