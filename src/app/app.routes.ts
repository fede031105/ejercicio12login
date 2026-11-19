import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PrincipalComponent } from './components/principal/principal';
import { ProductosComponent } from './components/productos/productos';
import { CategoriasComponent } from './components/categorias/categorias';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];