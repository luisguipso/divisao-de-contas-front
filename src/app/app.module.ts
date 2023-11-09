import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';
import { DespesaComponent } from './despesa/despesa/despesa.component';
import { PeriodoDetailsComponent } from './periodo/components/periodo-details/periodo-details.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';
import { UsuarioComponent } from './usuario/components/usuario/usuario.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ListaUsuariosComponent } from './usuario/components/lista-usuarios/lista-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtratoComponent } from './extrato/component/extrato.component';
import { TabViewModule } from 'primeng/tabview';
import { ExtratoPorUsuarioComponent } from './extrato/por-usuario/component/extrato-por-usuario.component';
import { ExtratoPorCategoriaComponent } from './extrato/por-categoria/component/extrato-por-categoria.component';
import { CategoriaComponent } from './categoria/components/categoria/categoria.component';
import { ListaCategoriasComponent } from './categoria/components/lista-categorias/lista-categorias.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodoDetailsComponent,
    ListaPeriodosComponent,
    DespesaComponent,
    PeriodoComponent,
    ExtratoPorUsuarioComponent,
    UsuarioComponent,
    SidenavComponent,
    ListaUsuariosComponent,
    ExtratoPorCategoriaComponent,
    ExtratoComponent,
    CategoriaComponent,
    ListaCategoriasComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    TabViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
