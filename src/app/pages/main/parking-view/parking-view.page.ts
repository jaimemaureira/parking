import { Component, inject, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { BarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.page.html',
  styleUrls: ['./parking-view.page.scss'],
})
export class ParkingViewPage implements OnInit {

  parkings: any [] = []; // aqui se guarda la lista de estacionamientos
  userRole: string = ''; // Rol del usuario

  supaSvc = inject(SupabaseService);
  alertCtrlr = inject(AlertController);
  loadingCtrl = inject(LoadingController);

  

  constructor() { }

  async ngOnInit() {    

    await this.loadParkings();
  }

  

  async loadParkings() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando estacionamientos...'
    });
    await loading.present();
    try {
      // Obtener el usuario autenticado
      const user = await this.supaSvc.getUser();
      const userId = user?.id;
      const userEmail = user?.email;
  
      if (!userId || !userEmail) {
        console.error('No se pudo obtener el ID o el email del usuario');
        alert('Error: No se pudo obtener el ID o el email del usuario');
        return;
      }
  
      // Obtener el rol del usuario autenticado
      const roleName = await this.supaSvc.getUserRole(userEmail);
  
      if (!roleName) {
        console.error('No se pudo obtener el rol del usuario');
        alert('Error: No se pudo obtener el rol del usuario');
        return;
      }

      this.userRole = roleName;
      
  
      // Cargar estacionamientos según el rol del usuario
      let data;
      if (roleName === 'admin') {
        data = await this.supaSvc.getParkings();
      } else if (roleName === 'prestador') {
        data = await this.supaSvc.getParkingsByUser(userId);
      }else if (roleName === 'usuario') {
        data = await this.supaSvc.getParkings();
      }       else {
        console.warn('Rol no reconocido');
        data = [];
      }
  
      this.parkings = data;
      if (!this.parkings.length) {
        console.warn('No se encontraron estacionamientos.');
      }
    } catch (error) {
      console.error('Error cargando estacionamientos:', error);
    } finally {
      await loading.dismiss();
    }
  }
  
  disponible(parking: any){
    if(parking.capacidad !== undefined && parking.arrendado !== undefined){
      const disponible = parking.capacidad - parking.arrendado;
      
      return disponible;
    }
    return 0; // Devolver 0 si las propiedades no están definidas

  }

  reserva(parking: any): number {
    return parking.reserva !== undefined ? parking.reserva : 0;
  }

  async deleteParking(parkingId: string) {
    const alert = await this.alertCtrlr.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este estacionamiento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              const loading = await this.loadingCtrl.create({
                message: 'Eliminando estacionamiento...'
              });
              await loading.present();

              await this.supaSvc.deleteParking(parkingId);
              console.log('Estacionamiento eliminado correctamente');
              this.loadParkings(); // Llamar al método para recargar la lista de estacionamientos

              await loading.dismiss();
            } catch (error) {
              console.error('Error eliminando el estacionamiento', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }
  
  async scanQRCode() {
    try {
      // Solicitar permiso para usar la cámara
      await BarcodeScanner.checkPermission({ force: true });

      // Iniciar el escaneo
      await BarcodeScanner.hideBackground(); // Ocultar la vista web para que solo se vea la cámara
      const result = await BarcodeScanner.startScan(); // Iniciar el escaneo

      // Verificar si se obtuvo un resultado
      if (result.hasContent) {
        console.log('Código QR escaneado:', result.content);
        // Aquí puedes manejar el contenido del código QR escaneado
      } else {
        console.warn('No se encontró contenido en el código QR');
      }
      
    } catch (error) {
      console.error('Error escaneando el código QR:', error);
    } finally {
      // Mostrar la vista web nuevamente
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  }

  openGoogleMaps(address: string) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  }

}
