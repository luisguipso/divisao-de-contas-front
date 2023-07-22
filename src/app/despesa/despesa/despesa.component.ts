import { Component, Input } from '@angular/core';
import { Despesa } from '../domain/despesa';
import { ActivatedRoute } from '@angular/router';
import { DespesaService } from '../service/despesa.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
})
export class DespesaComponent {
  @Input() despesa?: Despesa;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.getDespesa();
  }

  private getDespesa() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.despesaService
      .getDespesa(id)
      .subscribe((despesa) => (this.despesa = despesa));
  }

  salvar() {
    throw new Error('Method not implemented.');
  }

  goBack() {
    this.location.back();
  }
}
