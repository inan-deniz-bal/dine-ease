import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/interfaces/menu';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Order } from 'src/interfaces/order';
import { CurrentMenuService } from 'src/services/current-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  /* @Input() */ restaurantMenu: Menu[] = [
    {
      mealType: 'a',
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
  @Input() upperMenu: Boolean = false;
  clicked = false;
  clickedMenutype = '';

  orderMenu: Order[] = [];
  constructor(private curMen: CurrentMenuService) {}

  ngOnInit() {
    console.log('menü açıldı');
    this.restaurantMenu = this.curMen.getMenu();
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

  test(item: any) {
    let hasMeal = false;
    //burayı aktive edildiğinde sipariş için kullanabiliriz
    this.orderMenu.map((meal) => {
      if (meal.mealName == item.mealName) {
        hasMeal = true;
        if (meal.mealCount) {
          meal.mealCount += 1;
        }
      }
    });
    if (!hasMeal) {
      this.orderMenu.push({
        mealCount: 1,
        mealName: item.mealName,
        mealPrice: item.mealPrice,
      });
    }

    console.log('TIKLANAN YEMEK ', item);

    console.log('listemiz ', this.orderMenu);
  }

  addFood(item: any) {
    let hasMeal = false;
    this.orderMenu.forEach((meal) => {
      if (meal.mealName == item.mealName) {
        hasMeal = true;
        if (meal.mealCount) {
          meal.mealCount += 1;
        }
      }
    });
    if (!hasMeal) {
      this.orderMenu.push({
        mealCount: 1,
        mealName: item.mealName,
        mealPrice: item.mealPrice,
      });
    }
    console.log('liste ', this.orderMenu);
  }
  removeFood(item: any) {
    this.orderMenu.forEach((meal) => {
      if (meal.mealName == item.mealName && meal.mealCount) {
        meal.mealCount -= 1;
        if (meal.mealCount == 0) {
          this.orderMenu = this.orderMenu.filter(
            (orderMeal) => orderMeal != meal
          );
        }
      }
    });
    console.log('liste ', this.orderMenu);
  }
}
