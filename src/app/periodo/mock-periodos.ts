import { USUARIOS } from '../usuario/mock-usuario';
import { Periodo } from './domain/periodo';

export const PERIODOS: Periodo[] = [
  {
    id: 1,
    descricao: 'Julho/2023',
    divisores: USUARIOS,
    isFechado: false,
    valor: 1500.0,
  },
  {
    id: 2,
    descricao: 'Junho/2023',
    divisores: USUARIOS,
    isFechado: true,
    valor: 1420.0,
  },
  {
    id: 3,
    descricao: 'Maio/2023',
    divisores: USUARIOS,
    isFechado: true,
    valor: 1560.0,
  },
  {
    id: 4,
    descricao: 'Abril/2023',
    divisores: USUARIOS,
    isFechado: true,
    valor: 2780.0,
  },
  {
    id: 5,
    descricao: 'Março/2023',
    divisores: USUARIOS,
    isFechado: true,
    valor: 1460.0,
  },
  {
    id: 6,
    descricao: 'Fevereiro/2023',
    divisores: USUARIOS,
    isFechado: true,
    valor: 980.0,
  },
  {
    id: 7,
    descricao: 'Janeiro/2023',
    divisores: USUARIOS,
    isFechado: true,
    valor: 600.0,
  },
];
