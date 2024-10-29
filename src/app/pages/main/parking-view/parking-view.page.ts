import { Component, inject, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.page.html',
  styleUrls: ['./parking-view.page.scss'],
})
export class ParkingViewPage implements OnInit {

  parkings: any [] = []; // aqui se guarda la lista de estacionamientos

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
      const data = await this.supaSvc.getParkings();
      this.parkings = data;
      if (!this.parkings.length) {
        console.warn('No se encontraron estacionamientos.');
      }
    } catch (error) {
      console.error('Error cargando estacionamientos:', error);
    }finally {
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

}
