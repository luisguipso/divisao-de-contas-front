import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoDetailsComponent } from './periodo-details.component';

describe('PeriodoComponent', () => {
  let component: PeriodoDetailsComponent;
  let fixture: ComponentFixture<PeriodoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodoDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
