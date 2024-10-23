import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPrestadorPage } from './sign-up-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPrestadorPageRoutingModule {}
