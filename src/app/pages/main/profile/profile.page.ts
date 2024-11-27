import { Component, Inject, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  
  userName: string = '';
  rol: string = '';
  email: string = '';


  constructor(private supaSvc: SupabaseService) { }   

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
      }else{
        console.error('No se pudo obtener el rol del usuario');
      }

      const userEmail = await this.supaSvc.getCurrentUserEmail();
      console.log('userEmail:', userEmail);
      if(userEmail){
        this.email = userEmail;
      }

    } catch (error) {
      console.error('Error al obtener la información:', error);
    }
  }

  
}

