import { Component, OnInit } from '@angular/core';
import { WaiterTableHandlerService } from 'src/services/waiter-table-handler.service';
import { Order } from 'src/interfaces/order';

@Component({
  selector: 'app-waiter-take-payment',
  templateUrl: './waiter-take-payment.page.html',
  styleUrls: ['./waiter-take-payment.page.scss'],
})
// EKSİKLER
// FİYATLANDIRMA EKSİK
export class WaiterTakePaymentPage implements OnInit {
  orderList: Order[] = [
    {
      mealName: 'Pilav',
      mealCount: 3,
      mealPrice: 30,
    },
    {
      mealName: 'Cacık',
      mealCount: 1,
      mealPrice: 15,
    },
  ];

  mealsToPay: Order[] = [];

  constructor(private waiterTableService: WaiterTableHandlerService) {}
  tableName = '';
  ngOnInit() {
    this.tableName = this.waiterTableService.getTable();
  }

  addToPay(meal: Order) {
    const contains = this.mealsToPay.some(
      (payMeal) => payMeal.mealName === meal.mealName
    );

    console.log(contains);

    if (!contains) {
      this.mealsToPay.push({
        mealName: meal.mealName,
        mealCount: 1,
        mealPrice: meal.mealPrice,
      });
      this.orderList.map((listMeal) => {
        if (listMeal.mealName == meal.mealName) {
          listMeal.mealCount -= 1;
        }
      });
      console.log('Listeye eklendi ', this.mealsToPay);
    } else {
      this.mealsToPay.map((mealsToPay) => {
        if (mealsToPay.mealName == meal.mealName) {
          this.orderList.map((mealsLeft) => {
            if (
              mealsLeft.mealCount != 0 &&
              mealsLeft.mealName == mealsToPay.mealName
            ) {
              mealsToPay.mealCount += 1;
              mealsLeft.mealCount -= 1;
            }
          });
        }
      });
    }
    this.orderList = this.checkForNoMeal(this.orderList);
  }
  removeFromPay(meal: Order) {
    if (meal.mealCount && meal.mealCount <= 1) {
      const newMeals = this.mealsToPay.filter(
        (listMeal) => listMeal.mealName != meal.mealName
      );
      this.mealsToPay = newMeals;
      this.addToList(meal, this.orderList);
    } else {
      this.mealsToPay.map((listMeal) => {
        if (listMeal.mealName == meal.mealName && meal.mealCount) {
          listMeal.mealCount = meal.mealCount - 1;
          this.addToList(meal, this.orderList);
        }
      });
    }

    console.log(this.mealsToPay);
  }

  checkForNoMeal(orderList: Order[]) {
    orderList = orderList.filter((order) => order.mealCount != 0);
    return orderList;
  }

  addToList(meal: Order, mealList: Order[]) {
    const contains = mealList.some(
      (payMeal) => payMeal.mealName === meal.mealName
    );

    if (contains) {
      mealList = mealList.map((listMeal) => {
        if (listMeal.mealName == meal.mealName) {
          listMeal.mealCount += 1;
        }
        return listMeal;
      });
      return mealList;
    } else {
      mealList.push({
        mealName: meal.mealName,
        mealCount: 1,
        mealPrice: meal.mealPrice,
      });
      return mealList;
    }
  }
}
