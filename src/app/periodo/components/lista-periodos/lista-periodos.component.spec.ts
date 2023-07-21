import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPeriodosComponent } from './lista-periodos.component';

describe('ListaPeriodoComponent', () => {
  let component: ListaPeriodosComponent;
  let fixture: ComponentFixture<ListaPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPeriodosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
