import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeUserPage } from './home-user.page';

const routes: Routes = [
  {
    path: '',
    component: HomeUserPage
  },  {
    path: 'vehicle',
    loadChildren: () => import('./vehicle/vehicle.module').then( m => m.VehiclePageModule)
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUserPageRoutingModule {}
