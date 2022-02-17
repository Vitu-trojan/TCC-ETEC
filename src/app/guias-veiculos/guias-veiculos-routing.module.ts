import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiasVeiculosPage } from './guias-veiculos.page';

const routes: Routes = [
  {
    path: '',
    component: GuiasVeiculosPage,
    children: [
      {
        path: '',
        redirectTo: '/guias-veiculos/lista-veiculos',
        pathMatch: 'full'
      },
      {
        path: 'lista-veiculos',
        loadChildren: () => import('../lista-veiculos/lista-veiculos.module').then( m => m.ListaVeiculosPageModule)
      },
      {
        path: 'cadastro-veiculo',
        loadChildren: () => import('../cadastro-veiculo/cadastro-veiculo.module').then( m => m.CadastroVeiculoPageModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiasVeiculosPageRoutingModule {}
