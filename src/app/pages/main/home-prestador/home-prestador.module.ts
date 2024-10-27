import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePrestadorPageRoutingModule } from './home-prestador-routing.module';

import { HomePrestadorPage } from './home-prestador.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePrestadorPageRoutingModule,
    SharedModule
],
  declarations: [HomePrestadorPage]
})
export class HomePrestadorPageModule {}
