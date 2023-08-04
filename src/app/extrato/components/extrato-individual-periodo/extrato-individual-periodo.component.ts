import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Periodo } from 'src/app/periodo/domain/periodo';

@Component({
  selector: 'extrato-individual',
  templateUrl: './extrato-individual-periodo.component.html',
  styleUrls: ['./extrato-individual-periodo.component.css'],
})
export class ExtratoIndividualPeriodoComponent {
  @Input() periodo?: Periodo;
}
