import { Injectable } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Login } from 'src/classes/login';
import { Menu } from 'src/interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class ServerHandlerService {
  constructor() {}

  menu1: Menu = {
    mealType: 'Sıcaklar',
    meals: [
      {
        mealName: 'Ezogelin Çorbası',
        mealPrice: 70,
        mealCount: 20,
        ingridients: ['Tereyağ', 'Su', 'Mercimek'],
      },
      {
        mealName: 'Mercimek Çorbası',
        mealPrice: 70,
        mealCount: 20,
        ingridients: ['Tereyağ', 'Su', 'Mercimek'],
      },
      {
        mealName: 'Kelle Paça Çorbası',
        mealPrice: 110,
        mealCount: 20,
        ingridients: ['Tereyağ', 'Su', 'Mercimek'],
      },
    ],
  };

  menu2: Menu = {
    mealType: 'Pideler',
    meals: [
      {
        mealName: 'Kıymalı Pide',
        mealPrice: 70,
        mealCount: 20,
        ingridients: [ 'Kıyma',],
      },
      {
        mealName: 'Tavuklu Pide',
        mealPrice: 90,
        mealCount: 20,
        ingridients: [ 'Tavuk',],
      },
      {
        mealName: 'Kuşbaşı Kaşarlı Pide',
        mealPrice: 120,
        mealCount: 20,
        ingridients: [ 'Kuşbaşı','Kaşar Peyniri'],
      },
    ],
  };

  getRestList(): RestList[] {
    const rets: RestList[] = [
      new RestList(
        'Kardeşler Pide Fırını',
        4,
        2,
        ['Masa 1', 'Masa 2', 'Masa 3', 'Masa 4'],
        [this.menu1]
      ),
      new RestList("Burcu'nun Pastanesi", 4, 2,
      ["Tatlı Masası" , "Çikolata Masası", "Ekmek Masası", "Pide Masası"],
      [this.menu2,this.menu1]),
    ];
    return rets;
  }

  loginHandler(loginUser: Login) {
    const userList: Login[] = [
      new Login('gencayburcu@gmail.com', 'eyşan'),
      new Login('idb@gmail.com', 'cesur'),
    ];
  }
}
