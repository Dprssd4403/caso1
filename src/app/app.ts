
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs';

import { NavbarPublico } from './components/navbar-publico/navbar-publico';
import { NavbarPrivado } from './components/navbar-privado/navbar-privado';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarPublico,
    NavbarPrivado
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  esPrivada = false;

  constructor() {
    this.actualizarNavegacion();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.actualizarNavegacion());
  }

  private actualizarNavegacion(): void {
    const url = this.router.url.split('?')[0];

    this.esPrivada =
      url === '/peliculas' ||
      url === '/maratones';
  }
}
