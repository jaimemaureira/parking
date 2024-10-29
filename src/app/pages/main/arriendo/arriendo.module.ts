import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArriendoPageRoutingModule } from './arriendo-routing.module';

import { ArriendoPage } from './arriendo.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArriendoPageRoutingModule,
    SharedModule
],
  declarations: [ArriendoPage]
})
export class ArriendoPageModule {}
