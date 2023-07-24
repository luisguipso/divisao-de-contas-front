import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';
import { DespesaComponent } from './despesa/despesa/despesa.component';
import { PeriodoDetailsComponent } from './periodo/components/periodo-details/periodo-details.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista-periodos', pathMatch: 'full' },
  { path: 'lista-periodos', component: ListaPeriodosComponent },
  { path: 'periodo', component: PeriodoComponent },
  { path: 'periodo/:id', component: PeriodoComponent },
  { path: 'periodo-details/:id', component: PeriodoDetailsComponent },
  { path: 'criar-despesa/:periodoId', component: DespesaComponent },
  { path: 'editar-despesa/:id', component: DespesaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
