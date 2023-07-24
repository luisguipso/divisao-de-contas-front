import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';
import { DespesaComponent } from './despesa/despesa/despesa.component';
import { PeriodoDetailsComponent } from './periodo/components/periodo-details/periodo-details.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodoDetailsComponent,
    ListaPeriodosComponent,
    DespesaComponent,
    PeriodoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
