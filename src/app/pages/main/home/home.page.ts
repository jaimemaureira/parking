import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { ParkingViewPage } from '../parking-view/parking-view.page';
import { ArriendoPage } from '../arriendo/arriendo.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {  

  supaSvc = inject(SupabaseService);
  userRole: string = ''; // Rol del usuario

  

  ngOnInit() { 
    this.initializeUserRole();
  }

  async initializeUserRole() {
    const userId = await this.supaSvc.getUserId();
    if (userId) {
      const role = await this.supaSvc.getUserRoleById(userId);
      if (role) {
        this.userRole = role;
      }
    }
  }
  
  
  // Método para cerrar sesión
  async signOut() {
    await this.supaSvc.signOut();
    console.log('Sesión cerrada');
  }

    // Agregar o actualizar un estacionamiento
  addUpdateProduct() {

    this.supaSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
    })
  }

  addUpdateArriendo() {

    this.supaSvc.presentModal({
      component: ArriendoPage,
      cssClass: 'add-update-modal',
    })
  }

  

}
