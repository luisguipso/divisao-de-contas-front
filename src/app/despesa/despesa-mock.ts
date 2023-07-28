import { Usuario } from '../usuario/domain/usuario';
import { USUARIOS } from '../usuario/mock-usuario';
import { Despesa } from './domain/despesa';

const usuario: Usuario = USUARIOS[0];

export const DESPESAS: Despesa[] = [
  {
    id: 1,
    descricao: 'Mercado',
    data: new Date('2023-07-15'),
    isDivisivel: true,
    valor: 1500.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 2,
    descricao: 'Ifood',
    data: new Date('2023-07-12'),
    isDivisivel: true,
    valor: 120.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 3,
    descricao: 'Farmacia',
    data: new Date('2023-07-11'),
    isDivisivel: true,
    valor: 150.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 4,
    descricao: 'Lanche',
    data: new Date('2023-07-8'),
    isDivisivel: true,
    valor: 80.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 5,
    descricao: 'Diamante',
    data: new Date('2023-07-5'),
    isDivisivel: true,
    valor: 100.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 6,
    descricao: 'Festa',
    data: new Date('2023-07-5'),
    isDivisivel: true,
    valor: 90.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 7,
    descricao: 'Mercado',
    data: new Date('2023-07-3'),
    isDivisivel: true,
    valor: 60.0,
    periodo: 1,
    dono: usuario,
  },
  {
    id: 11,
    descricao: 'Mercado',
    data: new Date('2023-07-7'),
    isDivisivel: true,
    valor: 60.0,
    periodo: 1,
    dono: usuario,
  },

  {
    id: 12,
    descricao: 'Supermercado',
    data: new Date('2023-07-8'),
    isDivisivel: true,
    valor: 100.0,
    periodo: 2,
    dono: usuario,
  },

  {
    id: 13,
    descricao: 'Farmácia',
    data: new Date('2023-07-9'),
    isDivisivel: true,
    valor: 50.0,
    periodo: 3,
    dono: usuario,
  },

  {
    id: 14,
    descricao: 'Lavanderia',
    data: new Date('2023-07-10'),
    isDivisivel: true,
    valor: 20.0,
    periodo: 4,
    dono: usuario,
  },

  {
    id: 15,
    descricao: 'Mercado',
    data: new Date('2023-07-11'),
    isDivisivel: true,
    valor: 60.0,
    periodo: 5,
    dono: usuario,
  },

  {
    id: 16,
    descricao: 'Supermercado',
    data: new Date('2023-07-12'),
    isDivisivel: true,
    valor: 100.0,
    periodo: 6,
    dono: usuario,
  },

  {
    id: 17,
    descricao: 'Farmácia',
    data: new Date('2023-07-13'),
    isDivisivel: true,
    valor: 50.0,
    periodo: 7,
    dono: usuario,
  },
  {
    id: 18,
    descricao: 'Lavanderia',
    data: new Date('2023-07-14'),
    isDivisivel: true,
    valor: 20.0,
    periodo: 1,
    dono: usuario,
  },

  {
    id: 19,
    descricao: 'Mercado',
    data: new Date('2023-07-15'),
    isDivisivel: true,
    valor: 60.0,
    periodo: 2,
    dono: usuario,
  },

  {
    id: 20,
    descricao: 'Supermercado',
    data: new Date('2023-07-16'),
    isDivisivel: true,
    valor: 100.0,
    periodo: 3,
    dono: usuario,
  },

  {
    id: 21,
    descricao: 'Farmácia',
    data: new Date('2023-07-17'),
    isDivisivel: true,
    valor: 50.0,
    periodo: 4,
    dono: usuario,
  },

  {
    id: 22,
    descricao: 'Lavanderia',
    data: new Date('2023-07-18'),
    isDivisivel: true,
    valor: 20.0,
    periodo: 5,
    dono: usuario,
  },

  {
    id: 23,
    descricao: 'Mercado',
    data: new Date('2023-07-19'),
    isDivisivel: true,
    valor: 60.0,
    periodo: 6,
    dono: usuario,
  },

  {
    id: 24,
    descricao: 'Supermercado',
    data: new Date('2023-07-20'),
    isDivisivel: true,
    valor: 100.0,
    periodo: 7,
    dono: usuario,
  },
];
