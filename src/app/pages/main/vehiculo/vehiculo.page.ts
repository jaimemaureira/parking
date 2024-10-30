import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  supaSvc = Inject(SupabaseService);
  

  form = new FormGroup({
    patente: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    tipo_vehiculo: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
  });

  constructor() {
    
   }

  ngOnInit() {
  }

  

  async submit() {
    const loading = await this.supaSvc.create({
      message: 'Guardando vehiculo...',
    });
    await loading.present();

    try {
      
      // Usar el UUID generado por Supabase para fk en la tabla 'vehiculo'
      const user_id = this.supaSvc.getUserId();
      console.log('User ID:', user_id);
      if (!user_id) {
        throw new Error('Usuario no autenticado');
      }

      const vehiculoData = {
        user_id,
        ...this.form.value
      };

      // Insertar datos en la tabla 'vehiculo'
      const { data, error } = await this.supaSvc.supabase
        .from('vehiculo')
        .insert(vehiculoData);

      if (error) {
        console.error('Error al registrar vehiculo:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      console.log('Vehiculo registrado:', data);
      await loading.dismiss();
    } catch (error: unknown) {
      console.error('Error al registrar vehiculo:', error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Error desconocido al registrar el vehiculo');
      }
    } finally {
      await loading.dismiss();
    }
  }
}