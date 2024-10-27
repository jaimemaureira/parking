import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home-prestador',
  templateUrl: './home-prestador.page.html',
  styleUrls: ['./home-prestador.page.scss'],
})
export class HomePrestadorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 supaSvc = inject(SupabaseService);

  
  
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
}
