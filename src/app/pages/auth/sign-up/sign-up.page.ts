import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  
})
export class SignUpPage implements OnInit {

  supaSvc = inject(SupabaseService);

  form = new FormGroup({
    persona_id: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido : new FormControl('', [Validators.required, Validators.minLength(3)]),
    rut: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl<any>('', [Validators.required, Validators.email]),
    password: new FormControl<any>('', [Validators.required]),
    repassword: new FormControl('', [Validators.required]),
    
    
  });

  constructor() { }

  ngOnInit() {
  }

  async submit() {
    console.log(this.form.value);
    const { persona_id, nombre, apellido, rut, telefono, email, password } = this.form.value;
    const additionalData = { persona_id, nombre, apellido, rut, telefono, email };

    // Crear loading
    const loading = await this.supaSvc.loading()
    await loading.present();

    try {
      // Registrar al usuario
      const { data: signUpData, error: signUpError } = await this.supaSvc.signUp(email, password, additionalData);
      if (signUpError) {
        console.error('Error al registrar usuario:', signUpError.message);
        alert(`Error: ${signUpError.message}`);
        return;
      }

      // Verificar si signUpData.user no es null
      if (!signUpData.user) {
        console.error('Error: Usuario no registrado correctamente.');
        alert('Error: Usuario no registrado correctamente.');
        return;
      }
      // Mostrar mensaje de registro exitoso
      alert('Registro exitoso');
      console.log('Registro exitoso:', signUpData);

      // Redirigir a la página de inicio de sesión
      this.supaSvc.router.navigate(['/auth']);
      // Limpiar formulario
      this.form.reset();

      
    } // Mostrar mensaje de error
    catch (error) {
      console.error('Error desconocido:', error);
      alert('Error desconocido');
    // Cerrar loading
    }finally {
      await loading.dismiss();
    }
  }
 }
