import { Component } from '@angular/core';
import { Categoria } from '../../domain/categoria';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent {
  categoria: Categoria = {
    nome: '',
  };
  titulo: string = '';
  idCategoria?: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.setId();
    this.setTitulo();
    this.setCategoria();
  }

  setId() {
    this.idCategoria = Number(this.route.snapshot.paramMap.get('id'));
  }

  setTitulo() {
    this.titulo = this.idCategoria ? 'Editar Categoria' : 'Nova Categoria';
  }

  private setCategoria() {
    if (this.idCategoria) {
      this.buscaCategoria(this.idCategoria);
    }
  }

  private buscaCategoria(id: number) {
    this.categoriaService
      .getCategoria(id)
      .subscribe((categoria) => (this.categoria = categoria));
  }

  salvar() {
    if (!this.categoria) {
      console.log('empty categoria');
      return;
    }
    if (this.categoria.id) {
      this.updadeCategoria(this.categoria);
    } else {
      this.salvarCategoria(this.categoria);
    }
  }

  salvarCategoria(categoria: Categoria) {
    this.categoriaService.salvarCategoria(categoria).subscribe({
      next: () => {
        alert(`Categoria ${categoria.nome} salva com sucesso!`);
        this.goBack();
      },
      error: (error) => alert(error.message),
    });
  }

  updadeCategoria(categoria: Categoria) {
    this.categoriaService.atualizarCategoria(categoria).subscribe({
      next: () => alert(`Categoria ${categoria.nome} atualizada com sucesso!`),
      error: (error) => alert(error.message),
    });
  }

  goBack() {
    this.location.back();
  }
}
