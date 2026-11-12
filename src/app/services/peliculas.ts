
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/peliculas';

  obtenerPeliculas(): Promise<Pelicula[]> {
    return firstValueFrom(
      this.http.get<Pelicula[]>(this.apiUrl)
    );
  }
}
