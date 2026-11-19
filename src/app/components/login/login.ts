import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ingresar(): void {
    this.errorMessage = '';
    this.loginService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/principal']);
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}