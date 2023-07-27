import { Usuario } from 'src/app/usuario/domain/usuario';

export interface Periodo {
  id?: number;
  descricao: String;
  divisores: Usuario[];
  isFechado: boolean;
  valor: number;
}
