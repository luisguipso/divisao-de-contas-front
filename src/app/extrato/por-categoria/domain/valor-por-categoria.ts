import { Categoria } from 'src/app/categoria/domain/categoria';

export interface ValorPorCategoria {
  categoria: Categoria;
  valorTotal: number;
}
