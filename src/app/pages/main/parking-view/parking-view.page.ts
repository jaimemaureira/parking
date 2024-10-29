import { Component, inject, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.page.html',
  styleUrls: ['./parking-view.page.scss'],
})
export class ParkingViewPage implements OnInit {

  parkings: any [] = [];

  supaSvc = inject(SupabaseService);
  alertCtrlr = inject(AlertController);
  loadingCtrl = inject(LoadingController);

  constructor() { }

  async ngOnInit() {    

    await this.loadParkings();
  }

  

  async loadParkings() {

    const loading = await this.supaSvc.loading()
    await loading.present();
    try {
      this.parkings = await this.supaSvc.getParkings();
      if (!this.parkings.length) {
        console.warn('No se encontraron estacionamientos.');
      }
    } catch (error) {
      console.error('Error cargando estacionamientos:', error);
    }finally {
      await loading.dismiss();
    }
  }

  async confirmDeleteParking(parking: any) {
    const alert = await this.alertCtrlr.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este estacionamiento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.executeDeleteParking(parking);
          }
        }
      ]
    });

    await alert.present();
  }

  async executeDeleteParking(parking: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando estacionamiento...',
    });
    await loading.present();
    try {
      const { error } = await this.supaSvc.supabase
        .from('parking')
        .delete()
        .eq('id', parking.id);
      if (error) {
        console.error('Error eliminando estacionamiento:', error);
        alert(`Error: ${error.message}`);
        return;
      }
      
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

  
  

}
