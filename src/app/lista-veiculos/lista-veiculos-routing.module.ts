import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVeiculosPage } from './lista-veiculos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVeiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaVeiculosPageRoutingModule {}
