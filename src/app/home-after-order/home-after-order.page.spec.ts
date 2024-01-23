import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeAfterOrderPage } from './home-after-order.page';

describe('HomeAfterOrderPage', () => {
  let component: HomeAfterOrderPage;
  let fixture: ComponentFixture<HomeAfterOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeAfterOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
