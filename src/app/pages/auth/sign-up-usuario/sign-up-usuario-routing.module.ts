import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpUsuarioPage } from './sign-up-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpUsuarioPageRoutingModule {}
