import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPrestadorPageRoutingModule } from './sign-up-prestador-routing.module';

import { SignUpPrestadorPage } from './sign-up-prestador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPrestadorPageRoutingModule
  ],
  declarations: [SignUpPrestadorPage]
})
export class SignUpPrestadorPageModule {}
