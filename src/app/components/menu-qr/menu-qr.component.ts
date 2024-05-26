import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/interfaces/menu';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Order } from 'src/interfaces/order';
import { TemporaryOrderService } from 'src/services/temporary-order.service';
@Component({
  selector: 'app-menu-qr',
  templateUrl: './menu-qr.component.html',
  styleUrls: ['./menu-qr.component.scss'],
})
export class MenuQrComponent  implements OnInit {

  @Input() restaurantMenu: Menu[] = [
    {
      mealType: '',
      meals: [
        {
          mealName: '',
          mealPrice: 0,
          mealCount: 0,
          ingridients: [],
        },
      ],
    },
  ];

  @Input() addCart: Boolean = true;
  clicked = false;
  clickedMenutype = '';

  orderMenu: Order[] = [];
  constructor(
    private tempOrder: TemporaryOrderService) {}

  ngOnInit() {

    console.log('kart ', this.addCart);
  }

  mealClicked(item: any) {
    console.log(item);
    if (item.mealType === this.clickedMenutype) {
      this.clickedMenutype = '';
    } else {
      this.clickedMenutype = item.mealType;
    }
  }

  addFood(item: any) {
    if(this.addCart)
      {
        let hasMeal = false;
        this.orderMenu.forEach((meal) => {
          if (meal.mealName == item.mealName) {
            hasMeal = true;
            if (meal.mealQuantity) {
              meal.mealQuantity += 1;
            }
          }
        });
        if (!hasMeal) {
          this.orderMenu.push({
            mealQuantity: 1,
            mealName: item.mealName,
            mealPrice: item.mealPrice,
          });
        }
        console.log('liste ', this.orderMenu);
        this.tempOrder.updateOrder(this.orderMenu)
      }

  }
  removeFood(item: any) {
    this.orderMenu.forEach((meal) => {
      if (meal.mealName == item.mealName && meal.mealQuantity) {
        meal.mealQuantity -= 1;
        if (meal.mealQuantity == 0) {
          this.orderMenu = this.orderMenu.filter(
            (orderMeal) => orderMeal != meal
          );
        }
      }
    });
    console.log('liste ', this.orderMenu);
    this.tempOrder.updateOrder(this.orderMenu)
  }
}
