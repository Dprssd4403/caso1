
import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Maraton } from '../../models/maraton';
import { MaratonesService } from '../../services/maratones';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-maratones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './maratones.html',
  styleUrl: './maratones.css'
})
export class Maratones implements OnInit {
  private servicio = inject(MaratonesService);
  private auth = inject(AuthService);

  maratones: Maraton[] = [];
  nombre = '';

  seleccionada: Maraton | null = null;

  mensaje = '';
  error = '';
  cargando = false;
  guardando = false;

  get usuarioId(): string {
    return this.auth.getUsuario()?.id ?? '';
  }

  async ngOnInit(): Promise<void> {
    await this.cargarMaratones();
  }

  async cargarMaratones(): Promise<void> {
    this.cargando = true;

    try {
      this.maratones =
        await this.servicio.obtenerMaratones(
          this.usuarioId
        );

      if (this.seleccionada) {
        this.seleccionada =
          this.maratones.find(
            maraton =>
              maraton.id === this.seleccionada?.id
          ) ?? null;
      }
    } catch (error) {
      console.error(error);
      this.error = 'Error al cargar maratones';
    } finally {
      this.cargando = false;
    }
  }

  async crearMaraton(): Promise<void> {
    this.error = '';
    this.mensaje = '';

    if (!this.nombre.trim()) {
      this.error =
        'El nombre de la maratón no puede estar vacío';
      return;
    }

    if (this.guardando) {
      return;
    }

    this.guardando = true;

    try {
      await this.servicio.crearMaraton(
        this.usuarioId,
        this.nombre
      );

      this.nombre = '';
      this.mensaje = 'Maratón creada correctamente';

      await this.cargarMaratones();
    } catch (error) {
      console.error(error);
      this.error = 'No se pudo crear la maratón';
    } finally {
      this.guardando = false;
    }
  }

  abrirModal(maraton: Maraton): void {
    this.seleccionada = maraton;
    this.error = '';
  }

  cerrarModal(): void {
    this.seleccionada = null;
    this.error = '';
  }

  cantidadPeliculas(maraton: Maraton): number {
    return Object.keys(
      maraton.peliculas ?? {}
    ).length;
  }

  obtenerPeliculas(maraton: Maraton) {
    return Object.entries(
      maraton.peliculas ?? {}
    ).map(([id, pelicula]) => ({
      id,
      ...pelicula
    }));
  }

  duracionTotal(maraton: Maraton): string {
    return this.servicio.calcularDuracion(maraton);
  }

  async quitarPelicula(
    peliculaId: string
  ): Promise<void> {
    if (!this.seleccionada || this.guardando) {
      return;
    }

    this.guardando = true;
    this.error = '';

    try {
      await this.servicio.quitarPelicula(
        this.usuarioId,
        this.seleccionada.id,
        peliculaId
      );

      await this.cargarMaratones();
    } catch (error) {
      console.error(error);
      this.error = 'No se pudo quitar la película';
    } finally {
      this.guardando = false;
    }
  }
}
