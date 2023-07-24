import { Despesa } from './../domain/despesa';
import { Component, Input } from '@angular/core';
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
  titulo: string = '';
  idDespesa?: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.setId();
    this.setTitulo();
    this.setDespesa();
    console.log(this.despesa?.periodo);
  }

  setId() {
    this.idDespesa = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idDespesa ? 'Editar Despesa' : 'Nova Despesa';
  }

  private setDespesa() {
    if (this.idDespesa) {
      this.buscaDespesa(this.idDespesa);
    } else {
      this.criaNovaDespesa();
    }
  }

  private buscaDespesa(id: number) {
    this.despesaService
      .getDespesa(id)
      .subscribe((despesa) => (this.despesa = despesa));
  }

  private criaNovaDespesa() {
    let periodoId = Number(this.route.snapshot.paramMap.get('periodoId'));
    this.despesa = {
      id: 0,
      descricao: '',
      data: new Date(),
      isDivisivel: false,
      valor: 0.0,
      periodo: periodoId,
    };
  }

  salvar() {
    throw new Error('Method not implemented.');
  }

  goBack() {
    this.location.back();
  }
}
