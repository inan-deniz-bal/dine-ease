import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Output, EventEmitter } from '@angular/core';
import { Order } from 'src/interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() selectedRest: RestList = new RestList('', 0, 0, [], []);
  @Input() tableNumber: string = '';
  @Output() callOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() closeOrder: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
  apply(order: Order) {
    this.callOrder.emit(order);
  }

  cancel() {
    this.closeOrder.emit();
  }
}
