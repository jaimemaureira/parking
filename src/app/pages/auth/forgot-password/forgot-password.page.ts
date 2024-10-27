import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  
  supaSvc = inject(SupabaseService);
  route = inject(Router);
  loadingCtrl = inject(LoadingController);

  form = new FormGroup({
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    
  });

  constructor() { }

  ngOnInit() {
  }
  
  // Método para recuperar contraseña
  async submit() {
    // Mostrar datos del formulario por consola
    console.log(this.form.value);

    // Obtener email
    const { email } = this.form.value;

    // Crear loading
    const loading = await this.supaSvc.loading();
    await loading.present();

    try {
      // Enviar solicitud de recuperación de contraseña
      let { data, error } = await this.supaSvc.sendPasswordResetEmail(email)
      
      if (error) {
        console.error('Error al enviar solicitud de recuperación de contraseña:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      console.log('Solicitud de recuperación de contraseña enviada:', data);
      alert('Solicitud de recuperación de contraseña enviada. Por favor, revisa tu correo electrónico.');

      // Redirigir a la página de inicio de sesión
      this.route.navigate(['/auth']);
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
