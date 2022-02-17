import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeilaoPage } from './leilao.page';

const routes: Routes = [
  {
    path: '',
    component: LeilaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeilaoPageRoutingModule {}
