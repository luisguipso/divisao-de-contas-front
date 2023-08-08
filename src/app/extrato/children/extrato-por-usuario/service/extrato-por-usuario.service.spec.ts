import { TestBed } from '@angular/core/testing';

import { ExtratoPorUsuarioService } from './extrato-por-usuario.service';

describe('ExtratoPorUsuarioService', () => {
  let service: ExtratoPorUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtratoPorUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
