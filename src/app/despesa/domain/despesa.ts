import { Categoria } from 'src/app/categoria/domain/categoria';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { Usuario } from 'src/app/usuario/domain/usuario';

export interface Despesa {
  id?: Number;
  descricao: String;
  data: Date;
  isDivisivel: boolean;
  valor: number;
  dono: Usuario;
  periodo: Periodo;
  categoria?: Categoria;
}
