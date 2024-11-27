import { Component, inject, Input, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() ismodal!: boolean;
  @Input() userRole!: string; // Añadir esta línea para aceptar el rol del usuario

  backButtonRoute: string = ''; // Definir la propiedad backButtonRoute

  supaSvc = inject(SupabaseService);

  ngOnInit() {
    this.setBackButtonRoute(this.userRole);
  }

  setBackButtonRoute(rol: string) {
    switch (rol) {
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
        this.backButtonRoute = '/auth';
        break;
    }
  }

  dismissModal(){
    this.supaSvc.dismissModal();
  }

}
