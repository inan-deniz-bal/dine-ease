import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Output, EventEmitter } from '@angular/core';
import { Order } from 'src/interfaces/order';
import { Menu } from 'src/interfaces/menu';
import { TemporaryOrderService } from 'src/services/temporary-order.service';
import { Table } from 'src/types/tableType';

@Component({
  selector: 'app-order-qr',
  templateUrl: './order-qr.component.html',
  styleUrls: ['./order-qr.component.scss'],
})
export class OrderQrComponent implements OnInit {
  @Input() restmenu: Menu[] = [];

  @Output() callOrder: EventEmitter<{ order: Order[]; date: Date }> =
    new EventEmitter<{ order: Order[]; date: Date }>();
  @Output() closeOrder: EventEmitter<any> = new EventEmitter<any>();

  selectedDateTime: Date = new Date();
  menuText = 'Menüyü Göster';

  minDateTime: string;
  minuteValues: string[] = [];

  menuOrderList: Order[] = [];

  total: number = 0;

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

      this.menuOrderList.forEach((meal) => {
        this.total += meal.mealPrice * meal.mealQuantity;
      });
    });
  }
  apply() {
    this.callOrder.emit({
      order: this.menuOrderList,
      date: this.selectedDateTime,
    });
  }

  cancel() {
    this.closeOrder.emit();
  }

  async openMenu() {
    console.log('menü', this.restmenu);
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.menuText = 'Menüyü Kapat';
    } else {
      this.menuText = 'Menüyü Göster';
    }
  }

  removeFood(Item: Order) {
    this.menuOrderList.forEach((meal) => {
      if (meal.mealName == Item.mealName && meal.mealQuantity) {
        meal.mealQuantity -= 1;
        if (meal.mealQuantity == 0) {
          this.menuOrderList.splice(this.menuOrderList.indexOf(meal), 1);
        }
      }
    });
    this.tempOrder.updateOrder(this.menuOrderList);
  }

  onDateTimeChange(event: CustomEvent) {
    const selectedDateTimeString: string = event.detail.value;
    this.selectedDateTime = new Date(selectedDateTimeString);
    console.log('Selected Date/Time:', this.selectedDateTime);
    // Burada seçilen zamanı kullanabilirsiniz, örneğin başka bir değişkene atayabilir veya işlemler yapabilirsiniz.
  }
}
