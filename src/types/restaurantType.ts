import { Menu } from 'src/interfaces/menu';
import { Table } from './tableType';
export type Restaurant = {
  name: string;
  address: string;
  menu: Menu[];
  tableList: Table[];
  totalCapacity: Number;
  customerCount: Number;
  images?:string;
};
