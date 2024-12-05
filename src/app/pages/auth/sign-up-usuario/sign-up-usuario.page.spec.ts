import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpUsuarioPage } from './sign-up-usuario.page';

describe('SignUpUsuarioPage', () => {
  let component: SignUpUsuarioPage;
  let fixture: ComponentFixture<SignUpUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
