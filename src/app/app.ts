import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public loginService: LoginService, private router: Router) {}

  cerrarSesion(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}