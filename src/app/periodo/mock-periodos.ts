import { USUARIOS } from '../usuario/mock-usuario';
import { Periodo } from './domain/periodo';

export const PERIODOS: Periodo[] = [
  {
    id: 1,
    descricao: 'Julho/2023',
    pagadores: USUARIOS,
    isFechado: false,
    valorTotal: 1500.0,
  },
  {
    id: 2,
    descricao: 'Junho/2023',
    pagadores: USUARIOS,
    isFechado: true,
    valorTotal: 1420.0,
  },
  {
    id: 3,
    descricao: 'Maio/2023',
    pagadores: USUARIOS,
    isFechado: true,
    valorTotal: 1560.0,
  },
  {
    id: 4,
    descricao: 'Abril/2023',
    pagadores: USUARIOS,
    isFechado: true,
    valorTotal: 2780.0,
  },
  {
    id: 5,
    descricao: 'Março/2023',
    pagadores: USUARIOS,
    isFechado: true,
    valorTotal: 1460.0,
  },
  {
    id: 6,
    descricao: 'Fevereiro/2023',
    pagadores: USUARIOS,
    isFechado: true,
    valorTotal: 980.0,
  },
  {
    id: 7,
    descricao: 'Janeiro/2023',
    pagadores: USUARIOS,
    isFechado: true,
    valorTotal: 600.0,
  },
];
