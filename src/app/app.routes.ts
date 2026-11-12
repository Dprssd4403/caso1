
import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Desarrollador } from './pages/desarrollador/desarrollador';
import { Peliculas } from './pages/peliculas/peliculas';
import { Maratones } from './pages/maratones/maratones';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'desarrollador',
    component: Desarrollador
  },
  {
    path: 'peliculas',
    component: Peliculas,
    canActivate: [authGuard]
  },
  {
    path: 'maratones',
    component: Maratones,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
