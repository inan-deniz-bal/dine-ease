import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaiterTakePaymentPage } from './waiter-take-payment.page';

describe('WaiterTakePaymentPage', () => {
  let component: WaiterTakePaymentPage;
  let fixture: ComponentFixture<WaiterTakePaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaiterTakePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
