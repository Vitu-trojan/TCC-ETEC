import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmLeiloesPage } from './em-leiloes.page';

const routes: Routes = [
  {
    path: '',
    component: EmLeiloesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmLeiloesPageRoutingModule {}
