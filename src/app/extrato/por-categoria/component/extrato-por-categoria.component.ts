import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Periodo } from 'src/app/periodo/domain/periodo';

@Component({
  selector: 'extrato-individual',
  templateUrl: './extrato-por-categoria.component.html',
  styleUrls: ['./extrato-por-categoria.component.css'],
})
export class ExtratoPorCategoriaComponent {
  @Input() periodo?: Periodo;
}
