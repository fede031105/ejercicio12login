import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // --- SIMULACIÓN TEMPORAL ---
    if (credentials.username === 'admin' && credentials.password === '1234') {
      return of({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.token_simulado' }).pipe(
        tap(response => localStorage.setItem(this.tokenKey, response.token))
      );
    }
    return throwError(() => new Error('Credenciales inválidas'));
    // ---------------------------

    /* Descomenta esto cuando conectes tu backend real:
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
    */
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}