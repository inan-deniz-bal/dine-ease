import { Order } from './order';
export interface PastOrders {
  restaurantName:String
  totalPrice: Number;
  date: Date;
  orderedMeals: Order[];
  customerId?: String;
  _id?: String;
}
