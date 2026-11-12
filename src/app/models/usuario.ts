
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
}

export type UsuarioSesion = Omit<Usuario, 'password'>;
