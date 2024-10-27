import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingViewPage } from './parking-view.page';

describe('ParkingViewPage', () => {
  let component: ParkingViewPage;
  let fixture: ComponentFixture<ParkingViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
