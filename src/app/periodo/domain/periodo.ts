import { Usuario } from 'src/app/usuario/domain/usuario';

export interface Periodo {
  id?: number;
  descricao: String;
  pagadores: Usuario[];
  isFechado: boolean;
  valorTotal: number;
}
