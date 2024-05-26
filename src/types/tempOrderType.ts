import { Order } from 'src/interfaces/order';
export type TempOrder = {
  currentOrderId: String;
  orderedMeals: Order[];
  paidMeals: Order[];
  _id?: String;
};
