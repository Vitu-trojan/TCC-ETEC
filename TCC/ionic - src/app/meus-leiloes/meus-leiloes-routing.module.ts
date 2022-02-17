import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusLeiloesPage } from './meus-leiloes.page';

const routes: Routes = [
  {
    path: '',
    component: MeusLeiloesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusLeiloesPageRoutingModule {}
