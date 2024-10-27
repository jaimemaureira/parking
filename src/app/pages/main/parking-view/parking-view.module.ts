import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingViewPageRoutingModule } from './parking-view-routing.module';

import { ParkingViewPage } from './parking-view.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingViewPageRoutingModule,
    SharedModule
],
  declarations: [ParkingViewPage]
})
export class ParkingViewPageModule {}
