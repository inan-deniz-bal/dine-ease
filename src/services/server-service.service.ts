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
          mealQuantity: 2,
          mealName: 'Sıcak Çıkolata',
          mealPrice: 15,
        },
        {
          mealQuantity: 1,
          mealName: 'Pizza',
          mealPrice: 25,
        },
        {
          mealQuantity: 3,
          mealName: 'Pasta',
          mealPrice: 18,
        },
        {
          mealQuantity: 2,
          mealName: 'Salata',
          mealPrice: 12,
        },
        {
          mealQuantity: 4,
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
          mealQuantity: 2,
          mealName: 'Sıcak Çıkolata',
          mealPrice: 15,
        },
        {
          mealQuantity: 1,
          mealName: 'Pizza',
          mealPrice: 25,
        },
        {
          mealQuantity: 3,
          mealName: 'Pasta',
          mealPrice: 18,
        },
        {
          mealQuantity: 2,
          mealName: 'Salata',
          mealPrice: 12,
        },
        {
          mealQuantity: 4,
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
          mealQuantity: 2,
          mealName: 'Sıcak Çıkolata',
          mealPrice: 15,
        },
        {
          mealQuantity: 1,
          mealName: 'Pizza',
          mealPrice: 25,
        },
        {
          mealQuantity: 3,
          mealName: 'Pasta',
          mealPrice: 18,
        },
        {
          mealQuantity: 2,
          mealName: 'Salata',
          mealPrice: 12,
        },
        {
          mealQuantity: 4,
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
