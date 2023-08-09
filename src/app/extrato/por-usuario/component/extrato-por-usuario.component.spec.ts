import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoPorUsuarioComponent } from './extrato-por-usuario.component';

describe('ExtratoPeriodoComponent', () => {
  let component: ExtratoPorUsuarioComponent;
  let fixture: ComponentFixture<ExtratoPorUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtratoPorUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtratoPorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
