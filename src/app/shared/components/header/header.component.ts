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

  supaSvc = inject(SupabaseService);

  ngOnInit() {}

  dismissModal(){
    this.supaSvc.dismissModal();
  }

}
