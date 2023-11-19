import { AuthService } from './../../auth/service/auth.service';
import { Despesa } from './../domain/despesa';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DespesaService } from '../service/despesa.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { Periodo } from 'src/app/periodo/domain/periodo';
import { Categoria } from 'src/app/categoria/domain/categoria';
import { CategoriaService } from 'src/app/categoria/service/categoria.service';

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
  categorias: Categoria[] = [];
  selectedCategoriaName?: String;
  selectedPagadorName?: String;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setId();
    this.setTitulo();
    this.setDespesa();
    this.getCategorias();
  }

  setId() {
    this.idDespesa = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idDespesa ? 'Editar Despesa' : 'Nova Despesa';
  }

  private setDespesa() {
    if (this.idDespesa) {
      this.buscarDespesa(this.idDespesa);
    }
  }

  private buscarDespesa(id: number): void {
    this.despesaService.getDespesa(id).subscribe((despesa) => {
      this.despesa = despesa;
      const categoriaName = despesa.categoria?.nome;
      if (categoriaName) this.setCategoriaSelecionada(categoriaName);
    });
  }

  setCategoriaSelecionada(categoriaName: String): void {
    this.selectedCategoriaName = categoriaName;
  }

  getUsuarioLogado(): Usuario {
    return this.authService.getUsuarioLogado();
  }

  salvar(): void {
    if (!this.despesa) {
      console.log('empty despesa');
      return;
    }

    this.setCategoria();
    this.setPagador();
    if (this.despesa.id) {
      this.updadeDespesa(this.despesa);
    } else {
      this.salvarDespesa(this.despesa);
    }
  }

  setCategoria(): void {
    this.despesa.categoria = this.getCategoriaSelecionada();
  }

  getCategoriaSelecionada(): Categoria | undefined {
    return this.categorias.find(
      (each) => each.nome === this.selectedCategoriaName
    );
  }

  setPagador(): void {
    if (this.despesa.isDivisivel) return;

    let pagadorSelecionado = this.getPagadorSelecionado();
    this.despesa.pagador = pagadorSelecionado;
  }

  getPagadorSelecionado(): Usuario | undefined {
    return this.despesa.periodo.pagadores.find(
      (each) => each.nome === this.selectedPagadorName
    );
  }

  salvarDespesa(despesa: Despesa): void {
    this.despesaService.salvarDespesa(despesa).subscribe({
      next: () => {
        console.log(`Despesa: ${despesa.descricao} criada com sucesso!`);
        this.goBack();
      },
      error: (error) => alert(error.message),
    });
  }

  updadeDespesa(despesa: Despesa): void {
    this.despesaService.atualizarDespesa(despesa).subscribe({
      next: () => {
        console.log(`Despesa: ${despesa.descricao} atualizada com sucesso!`);
        this.goBack();
      },
      error: (error) => alert(error.message),
    });
  }

  goBack(): void {
    this.location.back();
  }

  onInputValor(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Replace commas with periods
    this.despesa.valor = Number(inputValue.replace(/,/g, '.'));
    console.log(inputValue);
  }

  getCategorias(): void {
    this.categoriaService
      .getCategorias(1, 10)
      .subscribe((categorias) => (this.categorias = categorias));
  }

  onSelectCategoria(selecionada: any): void {
    console.log(selecionada);
    this.selectedCategoriaName = selecionada;
  }
}
