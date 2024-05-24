import { Order } from 'src/interfaces/order';

export type MakeOrder = {
  customerId?: String;
  tableId: String;
  restaurantName: String;
  date: Date;
  totalPrice: Number;
  orderedMeals: Order[];
  orderStatus: String;
};
