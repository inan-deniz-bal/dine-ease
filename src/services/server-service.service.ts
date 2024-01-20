import { Injectable } from '@angular/core';
import { Order } from 'src/interfaces/order';
import { PastOrders } from 'src/interfaces/past-orders';
@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  private tempOrders: PastOrders[] = [
    {
      restaurantName:"Burcu'nun Pastanesi",
      totalPrice: 250,
      date: '20.0.2024',
      orderedMeals: [
        {
          mealCount: 2,
          mealName: 'Sıcak Çıkolata',
          mealPrice: 15,
        },
        {
          mealCount: 1,
          mealName: 'Pizza',
          mealPrice: 25,
        },
        {
          mealCount: 3,
          mealName: 'Pasta',
          mealPrice: 18,
        },
        {
          mealCount: 2,
          mealName: 'Salata',
          mealPrice: 12,
        },
        {
          mealCount: 4,
          mealName: 'Burger',
          mealPrice: 20,
        },
      ],
    },
    {
      restaurantName:"Burcu'nun Pastanesi",
      totalPrice: 420,
      date: '20.0.2024',
      orderedMeals: [
        {
          mealCount: 2,
          mealName: 'Sıcak Çıkolata',
          mealPrice: 15,
        },
        {
          mealCount: 1,
          mealName: 'Pizza',
          mealPrice: 25,
        },
        {
          mealCount: 3,
          mealName: 'Pasta',
          mealPrice: 18,
        },
        {
          mealCount: 2,
          mealName: 'Salata',
          mealPrice: 12,
        },
        {
          mealCount: 4,
          mealName: 'Burger',
          mealPrice: 20,
        },
      ],
    },
    {
      restaurantName:"Burcu'nun Pastanesi",
      totalPrice: 350,
      date: '20.0.2024',
      orderedMeals: [
        {
          mealCount: 2,
          mealName: 'Sıcak Çıkolata',
          mealPrice: 15,
        },
        {
          mealCount: 1,
          mealName: 'Pizza',
          mealPrice: 25,
        },
        {
          mealCount: 3,
          mealName: 'Pasta',
          mealPrice: 18,
        },
        {
          mealCount: 2,
          mealName: 'Salata',
          mealPrice: 12,
        },
        {
          mealCount: 4,
          mealName: 'Burger',
          mealPrice: 20,
        },
      ],
    },
  ];

  private userOrders: Order[] = [];

  constructor() {}

  orderItem(order: Order) {
    this.userOrders.push(order);
  }

  getPastOrders() {
    return this.tempOrders
  }
}
