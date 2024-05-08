import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Output, EventEmitter } from '@angular/core';
import { Order } from 'src/interfaces/order';
import { Menu } from 'src/interfaces/menu';
import { TemporaryOrderService } from 'src/services/temporary-order.service';
import { Restaurant } from 'src/types/restaurantType';
import { Table } from 'src/types/tableType';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() selectedRest: Restaurant={
    name: '',
    address: '',
    menu: [],
    tableList: [],
    totalCapacity: 0,
    customerCount: 0,
  }
  @Input() tableNumber: String = '';

  @Output() callOrder: EventEmitter<Order[]> = new EventEmitter<Order[]>();
  @Output() closeOrder: EventEmitter<any> = new EventEmitter<any>();

  minDateTime: string;
  minuteValues: string[] = [];

  menuOrderList: Order[] = [];

  showMenu: boolean = false;

  constructor(private tempOrder: TemporaryOrderService) {
    const currentDate = new Date();

    // Set minDateTime to the current date and time plus 30 minutes
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    // Round up to the nearest multiple of 5
    const roundedMinutes = Math.ceil(currentDate.getMinutes() / 5) * 5;
    currentDate.setMinutes(roundedMinutes);

    // Format the date to the required string format
    this.minDateTime = currentDate.toISOString();

    // Generate an array of minute values in increments of 5
    for (let i = 0; i < 60; i += 5) {
      const formattedMinutes = i < 10 ? `0${i}` : `${i}`;
      this.minuteValues.push(formattedMinutes);
    }
  }

  ngOnInit() {
    this.tempOrder.currentOrderSubject.subscribe((menu) => {
      this.menuOrderList = menu;
    });
  }
  apply() {
    console.log(this.menuOrderList);
    this.callOrder.emit(this.menuOrderList);
  }

  cancel() {
    this.closeOrder.emit();
  }

  async openMenu() {
    console.log(this.selectedRest.menu);
    this.showMenu = !this.showMenu;
  }

  removeFood(Item:Order){
    this.menuOrderList.forEach((meal) => {
      if (meal.mealName == Item.mealName && meal.mealCount) {
        meal.mealCount -= 1;
        if(meal.mealCount==0){
          this.menuOrderList.splice(this.menuOrderList.indexOf(meal),1);
        }
      }
    });
    this.tempOrder.updateOrder(this.menuOrderList);
  }
}
