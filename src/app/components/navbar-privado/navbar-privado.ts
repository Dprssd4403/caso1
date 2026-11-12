
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar-privado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-privado.html',
  styleUrl: './navbar-privado.css'
})
export class NavbarPrivado {
  private auth = inject(AuthService);

  get nombreUsuario(): string {
    return this.auth.getUsuario()?.nombre ?? '';
  }

  cerrarSesion(): void {
    this.auth.logout();
  }
}
