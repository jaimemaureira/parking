import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  userName: string = '';
  rol: string = '';
  email: string = '';
  backButtonRoute: string = '';
  vehiculo: any = {};
  vehiculoDetailsVisible: boolean = false; // Añadir esta propiedad para controlar la visibilidad del desplegable


  form = new FormGroup({
    imagen: new FormControl('', [Validators.required])
  });


  constructor(private supaSvc: SupabaseService, private router: Router) { }

  async ngOnInit() {

    try {
      const userId = await this.supaSvc.getUserId();
      console.log('userId:', userId);
      if (!userId) {
        console.error('No se pudo obtener el ID del usuario');
        return;
      }

      const userName = await this.supaSvc.getUserNameById(userId);
      if (userName) {
        this.userName = userName;
      } else {
        console.error('No se pudo obtener el nombre del usuario');
      }

      const userRole = await this.supaSvc.getUserRoleById(userId);
      if (userRole) {
        this.rol = userRole;
        console.log('userRole:', userRole);
      } else {
        console.error('No se pudo obtener el rol del usuario');
      }

      const userEmail = await this.supaSvc.getCurrentUserEmail();
      console.log('userEmail:', userEmail);
      if (userEmail) {
        this.email = userEmail;
      }

      // Obtener los datos del vehículo del usuario
      console.log('Obteniendo datos del vehículo para userId:', userId);
      const vehiculoData = await this.supaSvc.getVehiculoByUserId(userId);
      if (vehiculoData && vehiculoData.length > 0) {
        this.vehiculo = vehiculoData[0]; // Asignar el primer vehículo encontrado
        console.log('Datos del vehículo obtenidos:', this.vehiculo);
      } else {
        console.error('No se pudo obtener los datos del vehículo');
      }

    } catch (error) {
      console.error('Error al obtener la información:', error);
    }
  }

  toggleVehiculoDetails() {
    this.vehiculoDetailsVisible = !this.vehiculoDetailsVisible;
  }

  async takeImage() {
    const result = await this.supaSvc.takePicture('Imagen Usuario');
    const dataUrl = result.dataUrl;
    if (dataUrl) {
      this.form.controls.imagen.setValue(dataUrl);
    } else {
      this.form.controls.imagen.setValue(null);
    }
  }

  setBackButtonRoute() {
    switch (this.rol) {
      case 'Administrador':
        this.backButtonRoute = '/main/home';
        break;
      case 'Prestador':
        this.backButtonRoute = '/main/home-prestador';
        break;
      case 'Usuario':
        this.backButtonRoute = '/main/home-user';
        break;
      default:
        this.backButtonRoute = '/auth'; // Ruta predeterminada
        break;
    }
  }

  goBack() {
    this.router.navigate([this.backButtonRoute]);
  }

  async submit() {
    console.log(this.form.value);
    let { imagen } = this.form.value;

    if (!imagen) {
      console.error('No se ha proporcionado una imagen válida.');
      alert('Error: No se ha proporcionado una imagen válida.');
      return;
    }

    try {
      // Convertir la URL de la imagen a un objeto File
      const response = await fetch(imagen);
      const blob = await response.blob();
      const fileName = `avatares-${Date.now()}.jpg`; // Generar un nombre de archivo único
      const file = new File([blob], fileName, { type: blob.type });

      // Subir la imagen al contenedor 'imagen-parking' dentro del bucket
      const { data: uploadData, error: uploadError } = await this.supaSvc.uploadFile(file, `avatares/${fileName}`);

      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError.message);
        alert(`Error al subir la imagen: ${uploadError.message}`);
        return;
      }

      console.log('Imagen subida correctamente:', uploadData);
      alert('Imagen subida correctamente.');
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      alert('Error al procesar la imagen.');
    }


  }
}
