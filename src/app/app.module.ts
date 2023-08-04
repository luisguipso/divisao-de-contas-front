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
import { ExtratoIndividualPeriodoComponent } from './extrato/components/extrato-individual-periodo/extrato-individual-periodo.component';
import { ExtratoPeriodoComponent } from './extrato/components/extrato-periodo/extrato-periodo.component';
import { ExtratoComponent } from './extrato/components/extrato/extrato.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodoDetailsComponent,
    ListaPeriodosComponent,
    DespesaComponent,
    PeriodoComponent,
    ExtratoPeriodoComponent,
    UsuarioComponent,
    SidenavComponent,
    ListaUsuariosComponent,
    ExtratoIndividualPeriodoComponent,
    ExtratoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MultiSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
