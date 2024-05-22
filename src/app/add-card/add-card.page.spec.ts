import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCardPage } from './add-card.page';

describe('AddCardPage', () => {
  let component: AddCardPage;
  let fixture: ComponentFixture<AddCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
