import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage,
    children: [
      {
        path: '',
        redirectTo: '/usuario/perfil',
        pathMatch: 'full'
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'atualizar-avatar',
        loadChildren: () => import('../atualizar-avatar/atualizar-avatar.module').then( m => m.AtualizarAvatarPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
