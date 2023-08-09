import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoPorCategoriaComponent } from './extrato-por-categoria.component';

describe('ExtratoPorCategoriaComponent', () => {
  let component: ExtratoPorCategoriaComponent;
  let fixture: ComponentFixture<ExtratoPorCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtratoPorCategoriaComponent],
    });
    fixture = TestBed.createComponent(ExtratoPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
