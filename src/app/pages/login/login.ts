
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  cargando = false;

  async ingresar(): Promise<void> {
    this.error = '';

    if (!this.email.trim() || !this.password) {
      this.error = 'Completa todos los campos';
      return;
    }

    this.cargando = true;

    try {
      const correcto = await this.auth.login(
        this.email,
        this.password
      );

      if (correcto) {
        await this.router.navigate(['/peliculas']);
      } else {
        this.error =
          'Correo o contraseña incorrectos, o API no disponible';
      }
    } finally {
      this.cargando = false;
    }
  }
}
