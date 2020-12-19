import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/auth.model';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  setSession(tokens: Token) {
    const accessExpiresAt = moment(jwt_decode(tokens.token));
    localStorage.setItem('accessToken', tokens.token);
    localStorage.setItem('isStaff', String(tokens.is_staff));
    localStorage.setItem('accessExpiresAt', JSON.stringify(accessExpiresAt.valueOf()));
  }

  signUpOauth(token: string) {
    return this.http
      .post<Token>(`${this.apiUrl}/auth/oauth/confirm`, {token}, this.httpOptions)
      .pipe(
        tap(val => this.setSession(val)),
      );
  }

  signUp(username: string, email: string, password: string) {
    return this.http
      .post<Request>(`${this.apiUrl}/car_sharing_api/users/`, {username, email, password}, this.httpOptions);
  }

  signIn(username: string, password: string) {
    return this.http
      .post<Token>(`${this.apiUrl}/api-token-auth/`, {username, password}, this.httpOptions)
      .pipe(
        tap(val => this.setSession(val)),
      );
  }

  refresh() {
    const token = localStorage.getItem('accessToken');
    return this.http
      .post<Token>(`${this.apiUrl}/api-token-refresh/`, {token}, this.httpOptions)
      .pipe(
        tap(val => this.setSession(val)),
      );
  }

  signOut() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken') != null && !this.isExpired();
  }

  isStaff() {
    return localStorage.getItem('isStaff') == 'true'; 
  }

  isExpired() {
    const expiredAt = JSON.parse(localStorage.getItem('accessExpiredAt'));
    return moment() >= moment(expiredAt);
  }

  oAuth(email: string) {
    return this.http
      .post<Token>(`${this.apiUrl}/car_sharing_api/oauth/`, { "email": email}, this.httpOptions)
      .pipe(
        tap(val => this.setSession(val)),
      );
  }
}