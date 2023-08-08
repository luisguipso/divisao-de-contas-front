import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPeriodosComponent } from './periodo/components/lista-periodos/lista-periodos.component';
import { DespesaComponent } from './despesa/despesa/despesa.component';
import { PeriodoDetailsComponent } from './periodo/components/periodo-details/periodo-details.component';
import { PeriodoComponent } from './periodo/components/periodo/periodo.component';
import { UsuarioComponent } from './usuario/components/usuario/usuario.component';
import { ListaUsuariosComponent } from './usuario/components/lista-usuarios/lista-usuarios.component';
import { ExtratoComponent } from './extrato/component/extrato.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista-periodos', pathMatch: 'full' },
  { path: 'lista-periodos', component: ListaPeriodosComponent },
  { path: 'periodo', component: PeriodoComponent },
  { path: 'periodo/:id', component: PeriodoComponent },
  { path: 'periodo-details/:id', component: PeriodoDetailsComponent },
  { path: 'criar-despesa/:periodoId', component: DespesaComponent },
  { path: 'editar-despesa/:id', component: DespesaComponent },
  { path: 'extrato/:id', component: ExtratoComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
