import { AuthService } from './../../auth/service/auth.service';
import { Despesa } from './../domain/despesa';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DespesaService } from '../service/despesa.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/usuario/domain/usuario';
import { USUARIOS } from 'src/app/usuario/mock-usuario';
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
    this.getDespesa();
    this.getCategorias();
  }

  setId() {
    this.idDespesa = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idDespesa ? 'Editar Despesa' : 'Nova Despesa';
  }

  private getDespesa() {
    if (this.idDespesa) {
      this.buscaDespesa(this.idDespesa);
    }
  }

  private buscaDespesa(id: number) {
    this.despesaService.getDespesa(id).subscribe((despesa) => {
      this.despesa = despesa;
      const categoriaName = despesa.categoria?.nome;
      if (categoriaName) this.setCategoriaSelecionada(categoriaName);
    });
  }

  getUsuarioLogado(): Usuario {
    return this.authService.getUsuarioLogado();
  }

  salvar() {
    if (!this.despesa) {
      console.log('empty despesa');
      return;
    }

    this.setCategoria();
    if (this.despesa.id) {
      this.updadeDespesa(this.despesa);
    } else {
      this.salvarDespesa(this.despesa);
    }
  }

  setCategoria() {
    let categoriaSelecionada = this.getCategoriaSelecionada();
    this.despesa.categoria = categoriaSelecionada;
  }

  setCategoriaSelecionada(categoriaName: String) {
    this.selectedCategoriaName = categoriaName;
  }

  getCategoriaSelecionada(): Categoria | undefined {
    return this.categorias.find(
      (each) => each.nome === this.selectedCategoriaName
    );
  }

  salvarDespesa(despesa: Despesa) {
    this.despesaService.salvarDespesa(despesa).subscribe({
      next: () => {
        console.log(`Despesa: ${despesa.descricao} criada com sucesso!`);
        this.goBack();
      },
      error: (error) => alert(error.message),
    });
  }

  updadeDespesa(despesa: Despesa) {
    this.despesaService.atualizarDespesa(despesa).subscribe({
      next: () => {
        console.log(`Despesa: ${despesa.descricao} atualizada com sucesso!`);
        this.goBack();
      },
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

  getCategorias() {
    this.categoriaService
      .getCategorias(1, 10)
      .subscribe((categorias) => (this.categorias = categorias));
  }

  onSelectCategoria(selecionada: any) {
    console.log(selecionada);
    this.selectedCategoriaName = selecionada;
  }
}
