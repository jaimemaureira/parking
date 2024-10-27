import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from 'src/app/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private supaSvc: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.supaSvc.getUser();
    if (user) {
      // Si el usuario está autenticado, permitir el acceso
      return true;
    } else {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      this.router.navigate(['/auth']);
      return false;
    }
  }
}