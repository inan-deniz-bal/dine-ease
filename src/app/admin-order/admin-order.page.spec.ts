import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOrderPage } from './admin-order.page';

describe('AdminOrderPage', () => {
  let component: AdminOrderPage;
  let fixture: ComponentFixture<AdminOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
