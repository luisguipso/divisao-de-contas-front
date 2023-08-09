import { TestBed } from '@angular/core/testing';

import { ExtratoPorCategoriaService } from './extrato-por-categoria.service';

describe('ExtratoPorCategoriaService', () => {
  let service: ExtratoPorCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtratoPorCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
