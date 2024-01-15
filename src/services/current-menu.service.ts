import { Injectable } from '@angular/core';
import { Menu } from 'src/interfaces/menu';
import { Meal } from 'src/interfaces/meal';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CurrentMenuService {
  newMenu = new Subject<Menu[]>();
  currentMenu: Menu[] = [
    {
      mealType: '',
      meals: [],
    },
  ];
  constructor() {}

  setMenu(selectedMenu: Menu[]) {
    this.currentMenu = selectedMenu;
    this.newMenu.next(this.currentMenu);
  }

  getMenu(): Menu[] {
    this.newMenu.subscribe((menu) => {
      this.currentMenu = menu;
    });
    return this.currentMenu;
  }
  //yollardan biri bu verileri local'e atmak, böylece hangi masa hangi menüde kesinleştirebiliriz
}
