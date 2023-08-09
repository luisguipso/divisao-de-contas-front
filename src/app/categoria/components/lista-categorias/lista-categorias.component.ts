import { Component, HostListener } from '@angular/core';
import { Categoria } from '../../domain/categoria';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css'],
})
export class ListaCategoriasComponent {
  categorias: Categoria[] = [];
  page = 0;
  isLoading = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.getPaginaDeCategorias();
  }

  getPaginaDeCategorias(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.categoriaService
      .getCategorias(this.page, 10)
      .subscribe((categorias) => {
        if (this.categorias.length === 0) this.categorias = categorias;
        else this.categorias.push(...categorias);
        this.isLoading = false;
      });
    this.page++;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.getPaginaDeCategorias();
    }
  }
}
