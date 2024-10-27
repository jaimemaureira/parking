import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  form: FormGroup;
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supaSvc: SupabaseService,
    private loadingCtrl: LoadingController
  ) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    // Obtener el token de la URL
    this.token = this.route.snapshot.queryParamMap.get('access_token');
  }

  // Método para restablecer la contraseña
  async submit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.token) {
      const loading = await this.loadingCtrl.create({
        message: 'Restableciendo contraseña...',
      });
      await loading.present();

      const { error } = await this.supaSvc.updatePassword(this.token, this.form.value.password);

      await loading.dismiss();

      if (error) {
        alert('Error al restablecer la contraseña: ' + error.message);
      } else {
        alert('Contraseña restablecida con éxito');
        this.router.navigate(['/auth']);
      }
    } else {
      alert('Token no válido');
    }
  }
}