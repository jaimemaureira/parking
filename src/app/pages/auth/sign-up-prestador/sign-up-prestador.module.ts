import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPrestadorPageRoutingModule } from './sign-up-prestador-routing.module';

import { SignUpPrestadorPage } from './sign-up-prestador.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPrestadorPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SignUpPrestadorPage]
})
export class SignUpPrestadorPageModule {}
