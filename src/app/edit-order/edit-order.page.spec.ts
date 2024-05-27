import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditOrderPage } from './edit-order.page';

describe('EditOrderPage', () => {
  let component: EditOrderPage;
  let fixture: ComponentFixture<EditOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
