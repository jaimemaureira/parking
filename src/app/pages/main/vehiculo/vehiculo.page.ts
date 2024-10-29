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

  constructor() { }

  ngOnInit() {
  }

  form = new FormGroup({ 
    placa: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
   });

   async submite(){

    console.log(this.form.value);
    const { placa, marca, modelo, color, tipo } = this.form.value;
    

    // Crear loading
    const loading = await this.supaSvc.loading()
    await loading.present();

    try {
      // Insertar datos adicionales en la tabla 'vehiculo'
      const { data: vehiculoData, error: vehiculoError } = await this.supaSvc.insertVehiculo();
      if (vehiculoError) {
        console.error('Error al registrar vehiculo:', vehiculoError.message);
        alert(`Error: ${vehiculoError.message}`);
        return;
      }

      // Usar el UUID generado por Supabase para persona_id
      

      console.log('Vehiculo registrado:', vehiculoData);

      // Cerrar loading
      await loading.dismiss();

      // Redirigir al usuario a la página de inicio
      // this.router.navigate(['/main']);
    } catch (error: unknown) {
      console.error('Error al registrar vehiculo:', error);
      alert(`Error: ${error}`);
    } finally {
      // Cerrar loading
      await loading.dismiss();
    }
} 

}