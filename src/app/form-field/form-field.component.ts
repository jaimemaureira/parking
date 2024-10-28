import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent  implements OnInit {

  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() icon!: string;
  @Input() autocomplete: string = '';
  @Input() minlength: number = 4; // Se usa si la validación de minlength aplica

  constructor() { }

  ngOnInit() {}

}
