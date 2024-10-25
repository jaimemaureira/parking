import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  supaSvc = inject(SupabaseService);
  loadingCtrl = inject(LoadingController);

  form = new FormGroup({
    parking_id: new FormControl(''),
    imagen: new FormControl('', [Validators.required]),
    nombre_parking: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion : new FormControl('', [Validators.required, Validators.minLength(3)]),
    latitud: new FormControl('', [Validators.required]),
    longitud: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required, Validators.min(0)]),
    capacidad: new FormControl('', [Validators.required]),
    prestador_id: new FormControl('', [Validators.required]),
    
    
    
  });

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  //======= Tomar/ Seleccionar Imagen======
  async takeImage() {
    const result = await this.supaSvc.takePicture('Imagen del estacionamiento');
    const dataUrl = result.dataUrl;

    // Verificar si dataUrl es undefined
    if (dataUrl !== undefined) {
        this.form.controls.imagen.setValue(dataUrl);
    } else {
        // Manejar el caso en que dataUrl es undefined, por ejemplo:
        this.form.controls.imagen.setValue(null); // o alguna lógica adicional
    }
}

  



  async submit() {
    console.log(this.form.value);
    const { parking_id, imagen, nombre_parking, direccion, latitud, longitud, valor, capacidad, prestador_id } = this.form.value;

    // Crear loading
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
    });
    await loading.present();

    try {
      // Guardar los datos en la tabla de Supabase
      const {  error } = await this.supaSvc.insertDocument('parking', {
        parking_id,
        imagen : 'https://supabase.com/dashboard/project/tekcvtjzfewjaqgkatkh/storage/buckets/imagen-parking',
        nombre_parking,
        direccion,
        latitud,
        longitud,
        valor,
        capacidad,
        prestador_id,
      });

      if (error) {
        console.error('Error al guardar los datos:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      // Mostrar mensaje de éxito
      alert('Datos guardados correctamente.');
    } catch (err) {
      console.error('Error:', err);
      alert('Error al guardar los datos.');
    } finally {
      await loading.dismiss();
    }
  }
}

