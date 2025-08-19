import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MycouponsPage } from './mycoupons.page';

describe('MycouponsPage', () => {
  let component: MycouponsPage;
  let fixture: ComponentFixture<MycouponsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MycouponsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
