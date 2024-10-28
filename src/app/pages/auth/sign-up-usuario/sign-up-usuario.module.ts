import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpUsuarioPageRoutingModule } from './sign-up-usuario-routing.module';

import { SignUpUsuarioPage } from './sign-up-usuario.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpUsuarioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
  declarations: [SignUpUsuarioPage]
})
export class SignUpUsuarioPageModule {}
