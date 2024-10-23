import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private supaSvc: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.supaSvc.getUser();
    if (user) {
      // Si el usuario está autenticado, redirigir a la página principal
      this.router.navigate(['/auth']);
      return false;
    } else {
      // Si el usuario no está autenticado, permitir el acceso
      return true;
    }
  }
}

