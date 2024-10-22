import { Inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase = Inject(SupabaseClient);


  constructor() {
    this.supabase = createClient(environment.supaBaseConfig.supaApiUrl, environment.supaBaseConfig.supaApiKey);
   }

   //metodo para el registro de usuarios
   async signUp(userData: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      throw error;
    }

    return data;
  }
  
}
