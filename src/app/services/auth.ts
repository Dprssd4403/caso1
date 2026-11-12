
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import {
  Usuario,
  UsuarioSesion
} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:3000/usuarios';

  async login(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const usuarios = await firstValueFrom(
        this.http.get<Usuario[]>(this.apiUrl)
      );

      const encontrado = usuarios.find(usuario =>
        usuario.email.toLowerCase() ===
          email.trim().toLowerCase() &&
        usuario.password === password
      );

      if (!encontrado) {
        return false;
      }

      const sesion: UsuarioSesion = {
        id: encontrado.id,
        nombre: encontrado.nombre,
        email: encontrado.email
      };

      sessionStorage.setItem(
        'cinemet_usuario',
        JSON.stringify(sesion)
      );

      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  getUsuario(): UsuarioSesion | null {
    const datos = sessionStorage.getItem(
      'cinemet_usuario'
    );

    if (!datos) {
      return null;
    }

    try {
      const usuario = JSON.parse(datos) as UsuarioSesion;

      if (!usuario.id || !usuario.nombre) {
        return null;
      }

      return usuario;
    } catch {
      return null;
    }
  }

  estaAutenticado(): boolean {
    return this.getUsuario() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('cinemet_usuario');
    this.router.navigate(['/login']);
  }
}
