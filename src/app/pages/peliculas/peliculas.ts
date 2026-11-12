
import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Pelicula } from '../../models/pelicula';
import { Maraton } from '../../models/maraton';

import { PeliculasService } from '../../services/peliculas';
import { MaratonesService } from '../../services/maratones';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css'
})
export class Peliculas implements OnInit {
  private peliculasService = inject(PeliculasService);
  private maratonesService = inject(MaratonesService);
  private auth = inject(AuthService);

  peliculas: Pelicula[] = [];
  maratones: Maraton[] = [];

  generoSeleccionado = 'Todos';
  peliculaSeleccionada: Pelicula | null = null;

  mensaje = '';
  error = '';
  cargando = false;
  guardando = false;

  get usuarioId(): string {
    return this.auth.getUsuario()?.id ?? '';
  }

  get generos(): string[] {
    return [
      'Todos',
      ...new Set(
        this.peliculas.map(p => p.genero)
      )
    ];
  }

  get peliculasFiltradas(): Pelicula[] {
    if (this.generoSeleccionado === 'Todos') {
      return this.peliculas;
    }

    return this.peliculas.filter(
      pelicula =>
        pelicula.genero === this.generoSeleccionado
    );
  }

  async ngOnInit(): Promise<void> {
    this.cargando = true;

    try {
      this.peliculas =
        await this.peliculasService.obtenerPeliculas();

      this.maratones =
        await this.maratonesService.obtenerMaratones(
          this.usuarioId
        );
    } catch (error) {
      console.error(error);
      this.error = 'No se pudieron cargar los datos';
    } finally {
      this.cargando = false;
    }
  }

  async abrirModal(pelicula: Pelicula): Promise<void> {
    this.peliculaSeleccionada = pelicula;
    this.mensaje = '';
    this.error = '';

    try {
      this.maratones =
        await this.maratonesService.obtenerMaratones(
          this.usuarioId
        );
    } catch (error) {
      console.error(error);
      this.error = 'No se pudieron cargar las maratones';
    }
  }

  cerrarModal(): void {
    this.peliculaSeleccionada = null;
    this.mensaje = '';
    this.error = '';
  }

  async agregar(maraton: Maraton): Promise<void> {
    if (!this.peliculaSeleccionada || this.guardando) {
      return;
    }

    this.guardando = true;
    this.mensaje = '';
    this.error = '';

    try {
      const agregada =
        await this.maratonesService.agregarPelicula(
          this.usuarioId,
          maraton.id,
          this.peliculaSeleccionada
        );

      if (!agregada) {
        this.mensaje =
          'Esta película ya existe en esa maratón';
        return;
      }

      this.mensaje = 'Película agregada correctamente';

      this.maratones =
        await this.maratonesService.obtenerMaratones(
          this.usuarioId
        );
    } catch (error) {
      console.error(error);
      this.error = 'No se pudo agregar la película';
    } finally {
      this.guardando = false;
    }
  }
}
