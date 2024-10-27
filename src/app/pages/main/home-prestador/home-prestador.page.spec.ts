import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePrestadorPage } from './home-prestador.page';

describe('HomePrestadorPage', () => {
  let component: HomePrestadorPage;
  let fixture: ComponentFixture<HomePrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
