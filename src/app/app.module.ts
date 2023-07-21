import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';

@NgModule({
  declarations: [AppComponent, PeriodoComponent, ListaPeriodosComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
