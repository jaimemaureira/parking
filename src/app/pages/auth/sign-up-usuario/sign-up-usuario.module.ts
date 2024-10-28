import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpUsuarioPageRoutingModule } from './sign-up-usuario-routing.module';

import { SignUpUsuarioPage } from './sign-up-usuario.page';
import { SharedModule } from "../../../shared/shared.module";
import { FormFieldModule } from "../../../form-field/form-field.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpUsuarioPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormFieldModule
],
  declarations: [SignUpUsuarioPage]
})
export class SignUpUsuarioPageModule {}
