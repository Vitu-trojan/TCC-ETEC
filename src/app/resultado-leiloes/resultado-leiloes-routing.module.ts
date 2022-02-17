import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoLeiloesPage } from './resultado-leiloes.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoLeiloesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoLeiloesPageRoutingModule {}
