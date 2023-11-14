import { Menu } from 'src/interfaces/menu';
export class RestList {
  //Bu sınıf daha da geliştirilecek, sınıfta restoran ismi, doluluk, menü, masa listesi olacak

  constructor(
    private name: string,
    private totalCap: number,
    private customerCount: number,
    private tableList?: string[],
    private menuList?: Menu[]
  ) {
    this.name = name;
    this.totalCap = totalCap;
    this.customerCount = customerCount;
    this.tableList = tableList;
    this.menuList = menuList;
  }

  getName(): string {
    return this.name;
  }
  getRate(): string {
    return this.customerCount + '/' + this.totalCap;
  }

  getTables(): string[] {
    if (this.tableList) {
      return this.tableList;
    }
    return [];
  }
  getMenuList(): Menu[] {
    if (this.menuList) {
      return this.menuList;
    }
    return [];
  }
}
