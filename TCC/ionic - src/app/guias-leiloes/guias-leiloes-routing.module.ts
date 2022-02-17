import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiasLeiloesPage } from './guias-leiloes.page';

const routes: Routes = [
  {
    path: '',
    component: GuiasLeiloesPage,
    children: [
      {
        path: '',
        redirectTo: '/guias-leiloes/em-leiloes',
        pathMatch: 'full'
      },
      {
        path: 'em-leiloes',
        loadChildren: () => import('../em-leiloes/em-leiloes.module').then( m => m.EmLeiloesPageModule)
      },
      {
        path: 'meus-leiloes',
        loadChildren: () => import('../meus-leiloes/meus-leiloes.module').then( m => m.MeusLeiloesPageModule)
      },
    ],  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiasLeiloesPageRoutingModule {}
