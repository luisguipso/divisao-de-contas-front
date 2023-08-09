import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoIndividualPeriodoComponent } from './extrato-individual-periodo.component';

describe('ExtratoIndividualPeriodoComponent', () => {
  let component: ExtratoIndividualPeriodoComponent;
  let fixture: ComponentFixture<ExtratoIndividualPeriodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtratoIndividualPeriodoComponent],
    });
    fixture = TestBed.createComponent(ExtratoIndividualPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
