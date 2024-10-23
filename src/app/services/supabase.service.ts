import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient, UserAttributes, UserResponse } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { LoadingController, ModalController, ModalOptions } from '@ionic/angular';
import Swal from 'sweetalert2';
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

  

async takePicture(promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Toma una foto'
  });

  
};


  constructor() {
    this.supabase = createClient(environment.supaApiUrl, environment.supaApiKey);
  }

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

  //metodo registro de usuarios
  // async signUp(email: string, password: string, additionalData: any) {
  //   const { data, error } = await this.supabase.auth.signUp({
  //     email, password, options: { data: additionalData }
  //   });

    // Si el registro es exitoso, guarda los datos adicionales en la tabla persona
    
    // if (data?.user) {
    //   const { error: profileError } = await this.supabase
    //     .from(table)
    //     .insert([additionalData]);

    //   if (profileError) {
    //     Swal.fire('Error', 'No se pudo guardar el perfil', 'error');
    //     return { data: null, error: profileError };
    //   }

    // }

  //   return { data, error };
  // }  

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

}





