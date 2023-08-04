import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoPeriodoComponent } from './extrato-periodo.component';

describe('ExtratoPeriodoComponent', () => {
  let component: ExtratoPeriodoComponent;
  let fixture: ComponentFixture<ExtratoPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtratoPeriodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtratoPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
