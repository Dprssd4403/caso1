
import { Injectable } from '@angular/core';

import {
  ref,
  get,
  push,
  set,
  runTransaction
} from 'firebase/database';

import { database } from '../firebase.config';
import { Pelicula } from '../models/pelicula';

import {
  Maraton,
  PeliculaMaraton
} from '../models/maraton';

@Injectable({
  providedIn: 'root'
})
export class MaratonesService {

  async obtenerMaratones(
    usuarioId: string
  ): Promise<Maraton[]> {
    const referencia = ref(
      database,
      `maratones/${usuarioId}`
    );

    const snapshot = await get(referencia);

    if (!snapshot.exists()) {
      return [];
    }

    const datos = snapshot.val() as Record<
      string,
      {
        nombre: string;
        peliculas?: Record<string, PeliculaMaraton>;
      }
    >;

    return Object.entries(datos).map(([id, datos]) => ({
      id,
      nombre: datos.nombre,
      peliculas: datos.peliculas ?? {}
    }));
  }

  async crearMaraton(
    usuarioId: string,
    nombre: string
  ): Promise<void> {
    if (!nombre.trim()) {
      throw new Error('El nombre es obligatorio');
    }

    const referencia = ref(
      database,
      `maratones/${usuarioId}`
    );

    const nueva = push(referencia);

    await set(nueva, {
      nombre: nombre.trim()
    });
  }

  async agregarPelicula(
    usuarioId: string,
    maratonId: string,
    pelicula: Pelicula
  ): Promise<boolean> {
    const referencia = ref(
      database,
      `maratones/${usuarioId}/${maratonId}/peliculas/${pelicula.id}`
    );

    const resultado = await runTransaction(
      referencia,
      actual => {
        if (actual !== null) {
          return;
        }

        return {
          titulo: pelicula.titulo,
          duracion: pelicula.duracion
        };
      },
      { applyLocally: false }
    );

    return resultado.committed;
  }

  async quitarPelicula(
    usuarioId: string,
    maratonId: string,
    peliculaId: string
  ): Promise<void> {
    const referencia = ref(
      database,
      `maratones/${usuarioId}/${maratonId}/peliculas/${peliculaId}`
    );

    await set(referencia, null);
  }

  calcularDuracion(maraton: Maraton): string {
    const minutosTotales = Object.values(
      maraton.peliculas ?? {}
    ).reduce(
      (total, pelicula) => total + pelicula.duracion,
      0
    );

    const horas = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;

    return (
      String(horas).padStart(2, '0') +
      ':' +
      String(minutos).padStart(2, '0')
    );
  }
}
