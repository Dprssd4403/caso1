
export interface PeliculaMaraton {
  titulo: string;
  duracion: number;
}

export interface Maraton {
  id: string;
  nombre: string;
  peliculas: Record<string, PeliculaMaraton>;
}
