import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {

  supaSvc = inject(SupabaseService);
  loadingCtrl = inject(LoadingController);
  modalCtrl = inject(ModalController);

  form = new FormGroup({
    
    parking_id: new FormControl(''),
    imagen: new FormControl('', [Validators.required]),
    nombre_parking: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    valor: new FormControl('', [Validators.required, Validators.min(0)]),
    capacidad: new FormControl('', [Validators.required, Validators.min(1)]),
    created_at: new FormControl(''),
    created_by: new FormControl(''),

  });

  constructor() { }

 
  ngOnInit() {
  }

  //======= Tomar/ Seleccionar Imagen======
  async takeImage() {
    const result = await this.supaSvc.takePicture('Imagen del estacionamiento');
    const dataUrl = result.dataUrl;
    if (dataUrl) {
      this.form.controls.imagen.setValue(dataUrl);
    } else {
      this.form.controls.imagen.setValue(null);
    }
  }
  
  async submit() {
    console.log(this.form.value);
    let { parking_id, imagen, nombre_parking, direccion, valor, capacidad} = this.form.value;

    // Crear loading
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
    });
    await loading.present();

    try {
      // Verificar que la imagen no sea null o undefined
      if (!imagen) {
        throw new Error('La imagen es requerida');
      }

      // Generar un UUID si parking_id está vacío
      if (!parking_id) {
        parking_id = uuidv4(); // Invocar la función uuidv4() para obtener un UUID
      }

      // Convertir la URL de la imagen a un objeto File
      const response = await fetch(imagen);
      const blob = await response.blob();
      const fileName = `imagen-parking-${Date.now()}.jpg`; // Generar un nombre de archivo único
      const file = new File([blob], fileName, { type: blob.type });

      // Subir la imagen al contenedor 'imagen-parking' dentro del bucket
      const { data: uploadData, error: uploadError } = await this.supaSvc.uploadFile(file, `imagen-parking/${fileName}`);

      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError.message);
        alert(`Error al subir la imagen: ${uploadError.message}`);
        return;
      }

      // Obtener la URL de la imagen subida
      const imageUrl = uploadData.publicURL;

      // Obtener el ID del usuario autenticado
      const userId = await this.supaSvc.getUserId();

      // Guardar los datos en la tabla de Supabase
      const { error } = await this.supaSvc.insertDocument('parking', {
        parking_id,
        imagen,
        nombre_parking,
        direccion,
        valor,
        capacidad,        
        created_at: new Date().toISOString(), // Fecha y hora de creación
        created_by: userId, // ID del usuario que creó el estacionamiento
      });

      if (error) {
        console.error('Error al guardar los datos:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      // Mostrar mensaje de éxito
      alert('Datos guardados correctamente.');
      this.modalCtrl.dismiss();
    } catch (err) {
      console.error('Error:', err);
      alert('Error al guardar los datos.');
    } finally {
      await loading.dismiss();
    }
  }
}

