import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';



@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  
  

  form = new FormGroup({
    patente: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    tipo_vehiculo: new FormControl('', [Validators.required]),
    
  });

  constructor(private supaSvc: SupabaseService,) {
    
   }

  ngOnInit() {
  }

  

  async submit() {
    const loading = await this.supaSvc.loading();
    await loading.present();

    try {
      
      // Usar el UUID generado por Supabase para fk en la tabla 'vehiculo'
      

      const vehiculoData = {
        
        ...this.form.value
      };

      // Insertar datos en la tabla 'vehiculo'
      const { data, error } = await this.supaSvc.insertDocument('vehiculo', vehiculoData);
      if (error) {
        console.error('Error al registrar vehiculo:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      console.log('Vehiculo registrado:', data);
      alert('Vehículo guardado correctamente.');

      // Limpiar el formulario
      this.form.reset();
      
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