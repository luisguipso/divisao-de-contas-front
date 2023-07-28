import { Usuario } from 'src/app/usuario/domain/usuario';

export interface Despesa {
  id?: Number;
  descricao: String;
  data: Date;
  isDivisivel: boolean;
  valor: number;
  dono: Usuario;
  periodo: number;
}
