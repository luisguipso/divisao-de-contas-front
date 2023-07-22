import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';
import { DespesaComponent } from './despesa/despesa/despesa.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista-periodos', pathMatch: 'full' },
  { path: 'lista-periodos', component: ListaPeriodosComponent },
  { path: 'periodo/:id', component: PeriodoComponent },
  { path: 'despesa/:id', component: DespesaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
