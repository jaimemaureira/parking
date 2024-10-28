import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormFieldComponent } from './form-field.component';
import { SharedModule } from '../shared/shared.module'; // Importar el módulo compartido

@NgModule({
  declarations: [FormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule // Asegúrate de importar el módulo compartido
  ],
  exports: [FormFieldComponent] // Exportar el componente para que otros módulos puedan usarlo
})
export class FormFieldModule {}