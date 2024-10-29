import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient, UserAttributes, UserResponse } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { LoadingController, ModalController, ModalOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient
  loadingCtrl = inject(LoadingController);
  router = inject(Router);
  modalCtrl = inject(ModalController)
  



  constructor() {
    this.supabase = createClient(environment.supaApiUrl, environment.supaApiKey);
  }

    
//metodo para tomar fotos
async takePicture(promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,// Especifica que el resultado debe ser una URL de datos
    source: CameraSource.Prompt,// Especifica desde donde se adquiere la foto
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Toma una foto'
  });  
};

   // Método para registrar un usuario
   async signUp(email: string, password: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase.auth.signUp({
      email, password
    });

    return { data, error };
  }

  // Método para insertar un documento en una tabla de forma dinámica
  async insertDocument(table: string, data: any): Promise<{ data: any; error: any }> {
    const { data: insertedData, error } = await this.supabase
      .from(table)
      .insert([data]);

    if (error) {
      alert('Error, No se pudo guardar el perfil');
    }

    return { data: insertedData, error };
  }


  //metodo para iniciar sesion
  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // Método para cerrar sesión y redirigir a la página de autenticación
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (!error) {
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/auth']);
    } else {
      console.error('Error al cerrar sesión:', error.message);
    }
  }

  //loading
  async loading() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor espere...',
      spinner: 'crescent'
    });
    return loading;

  }
  //enrutamiento de paginas

  routerlink(url: string) {
    this.router.navigate([url]);
  }

  //guardar en local storage
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //obtener desde el local storage
  getFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  //enviar email de restablecimiento de contraseña

  async sendPasswordResetEmail(email: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  }

  // Método para actualizar la contraseña
  async updatePassword(_token: string, password: string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase.auth.updateUser({ password } as UserAttributes);
    return { data, error };
  }

  // Método para obtener el usuario autenticado
  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // Obtener el usuario a través de la sesión
async getUserId(): Promise<string | null> {
  const { data: { session } } = await this.supabase.auth.getSession();

  if (!session) {
    console.error('No se encontró una sesión activa.');
    return null;
  }

  return session.user.id;
}

  

  // =================== MODAL =================== //

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;

  }
  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);

  }


  // =================== BASE DE DATOS =================== //

   // Método para insertar un documento en una tabla
  // async insertDocument(_table: string, data: any): Promise<{ data: any; error: any }> {
  //   const { data: insertedData, error } = await this.supabase
  //     .from('parking')
  //     .insert([data]);
      

  //   return { data: insertedData, error };
  // }


  // Subir imágenes al storage de Supabase
  async uploadFile(file: File, filePath: string): Promise<{ data: any; error: any }> {
    const { error } = await this.supabase.storage.from('imagen-parking').upload(filePath, file);

    if (error) {
      console.error('Error al subir archivo:', error.message);
      return { data: null, error };
    }

    const { data: publicUrlData } = this.supabase.storage.from('imagen-parking').getPublicUrl(filePath);
    return { data: { publicURL: publicUrlData.publicUrl }, error: null };
  }

  // modificar un documento

  async updateDocument(table: string, data: any, id: string) {
    const { data: response, error } = await this.supabase.from(table).update(data).match({ id });
    return { response, error };
  }

  //obtener un documento

  async getDocument(table: string, id: string) {
    const { data, error } = await this.supabase.from(table).select().match({ id });
    return { data, error };
  }

  //eliminar un documento

  async deleteDocument(table: string, id: string) {
    const { data, error } = await this.supabase.from(table).delete().match({ id });
    return { data, error };
  }

  // Obtener todos los registros de la tabla 'parking'
  async getParkings(): Promise<any> {
    const { data, error } = await this.supabase
      .from('parking')
      .select('*');

    if (error) {
      console.error('Error al obtener los estacionamientos:', error.message);
      return [];
    }

    return data;
  }

  // Método para eliminar un estacionamiento
  async deleteParking(parkingId: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('parking') // Nombre de la tabla que se va a modificar
      .delete()
      .eq('parking_id', parkingId); // Filtra por el campo parking_id

    if (error) {
      throw new Error(`Error eliminando el estacionamiento: ${error.message}`);
    }
    return data;
  }

  //Metodo para guardar vehiculos en la ptabla vehiculo
  async saveVehicle(data: any, userUuid: string) {
    const { error } = await this.supabase
      .from('vehiculo')
      .insert([{ ...data, usuario_uuid: userUuid }]);
    return error;
  }

  // Obtener las coordenadas de la dirección
  // const location = await this.geocodingSvc.geocodeAddress(direccion);
  // if (location) {
  //   this.form.controls.latitud.setValue(location.lat);
  //   this.form.controls.longitud.setValue(location.lng);
  // } else {
  //   throw new Error('No se pudieron obtener las coordenadas de la dirección proporcionada');
  // }

  

}





