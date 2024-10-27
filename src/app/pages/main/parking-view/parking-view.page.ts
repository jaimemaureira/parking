import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.page.html',
  styleUrls: ['./parking-view.page.scss'],
})
export class ParkingViewPage implements OnInit {

  parkings: any [] = [];

  supaSvc = inject(SupabaseService);

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

  editParking(parking: any) {
    console.log('Edit clicked for:', parking);
    // Lógica para editar el estacionamiento
  }

  deleteParking(parking: any) {
    console.log('Delete clicked for:', parking);
    // Lógica para eliminar el estacionamiento

    
  }
  

}
