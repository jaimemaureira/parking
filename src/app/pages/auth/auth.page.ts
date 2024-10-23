import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  supaSvc = inject(SupabaseService);
  route = inject(Router);
  loadingCtrl = inject(LoadingController);

  form = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() { }

  ngOnInit() {
  }
  
  //metodo para iniciar sesion
  async submit(){
    // Mostrar datos del formulario por consola
    console.log(this.form.value);

    // Obtener email y password
    const { email, password } = this.form.value;
    
    // Crear loading
    const loading = await this.supaSvc.loading()
    await loading.present();

    // Iniciar sesión
    try {
      
      const { data, error } = await this.supaSvc.signIn(email, password);
      if (error) {
        // Mostrar mensaje de error
        console.error('Error al iniciar sesión:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      // Mostrar mensaje de inicio de sesión exitoso
      console.log('Inicio de sesión exitoso:', data);
      alert('Inicio de sesión exitoso');
      
      // Redirigir a la página principal
      this.supaSvc.routerlink('/main/home');

      // Limpiar formulario
      this.form.reset();

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error('Error desconocido:', error);
        alert('Error desconocido');
      }
      // Cerrar loading
    } finally {
      await loading.dismiss();
    }
  }
}
  
