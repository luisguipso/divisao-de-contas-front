import { Usuario } from 'src/app/usuario/domain/usuario';

export interface LoginResponse {
  accessToken: string;
  usuarioLogado: Usuario;
}
