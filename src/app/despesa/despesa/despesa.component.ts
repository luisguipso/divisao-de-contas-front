import { Despesa } from './../domain/despesa';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DespesaService } from '../service/despesa.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { USUARIOS } from 'src/app/usuario/mock-usuario';
import { Periodo } from 'src/app/periodo/domain/periodo';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css'],
})
export class DespesaComponent {
  despesa: Despesa = {
    descricao: '',
    data: new Date(),
    isDivisivel: true,
    valor: 0.0,
    periodo: this.location.getState() as Periodo,
    dono: this.getUsuarioLogado(),
  };
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
    }
  }

  private buscaDespesa(id: number) {
    this.despesaService
      .getDespesa(id)
      .subscribe((despesa) => (this.despesa = despesa));
  }

  getUsuarioLogado(): Usuario {
    //TODO
    return USUARIOS[1];
  }

  salvar() {
    if (!this.despesa) {
      console.log('empty despesa');
      return;
    }
    if (this.despesa.id) {
      this.updadeDespesa(this.despesa);
    } else {
      this.salvarDespesa(this.despesa);
    }
  }

  salvarDespesa(despesa: Despesa) {
    this.despesaService.salvarDespesa(despesa).subscribe({
      next: () => {
        alert('Despesa criada com Sucesso');
        this.goBack();
      },
      error: (error) => alert(error.message),
    });
  }

  updadeDespesa(despesa: Despesa) {
    this.despesaService.atualizarDespesa(despesa).subscribe({
      next: () => alert('Despesa criada com Sucesso'),
      error: (error) => alert(error.message),
    });
  }

  goBack() {
    this.location.back();
  }

  onInputValor(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Replace commas with periods
    this.despesa.valor = Number(inputValue.replace(/,/g, '.'));
    console.log(inputValue);
  }
}
