import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpPrestadorPage } from './sign-up-prestador.page';

describe('SignUpPrestadorPage', () => {
  let component: SignUpPrestadorPage;
  let fixture: ComponentFixture<SignUpPrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
