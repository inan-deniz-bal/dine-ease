import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaiterTablePage } from './waiter-table.page';

describe('WaiterTablePage', () => {
  let component: WaiterTablePage;
  let fixture: ComponentFixture<WaiterTablePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaiterTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
