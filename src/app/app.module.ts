import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';
import { DespesaComponent } from './despesa/despesa/despesa.component';
import { PeriodoDetailsComponent } from './periodo/components/periodo-details/periodo-details.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';
import { ExtratoPeriodoComponent } from './periodo/components/extrato-periodo/extrato-periodo.component';
import { UsuarioComponent } from './usuario/components/usuario/usuario.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ListaUsuariosComponent } from './usuario/components/lista-usuarios/lista-usuarios.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
