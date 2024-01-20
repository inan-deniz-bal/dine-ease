import { Order } from './order';
export interface PastOrders {
  restaurantName:String
  totalPrice: Number;
  date: String;
  orderedMeals: Order[];
}
