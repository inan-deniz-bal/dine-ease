import { Injectable } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Login } from 'src/classes/login';
import { Menu } from 'src/interfaces/menu';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ServerHandlerService {
  constructor(private loginSer: LoginService) {}

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
        ingridients: ['Kıyma'],
      },
      {
        mealName: 'Tavuklu Pide',
        mealPrice: 90,
        mealCount: 20,
        ingridients: ['Tavuk'],
      },
      {
        mealName: 'Kuşbaşı Kaşarlı Pide',
        mealPrice: 120,
        mealCount: 20,
        ingridients: ['Kuşbaşı', 'Kaşar Peyniri'],
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
      new RestList(
        "Burcu'nun Pastanesi",
        20,
        2,
        [
          'Atakan',
          'Bora',
          'Eda',
          'Rüya',
          'Tuna',
          'Deniz',
          'Utku',
          'Mert',
          'Kemal',
          'Savaş',
          'Ege',
          'Berat',
          'Aydemir',
          'Fatih',
        ],
        [this.menu2, this.menu1]
      ),
    ];
    return rets;
  }

  loginHandler(loginUser: Login): string {
    const userList: Login[] = [
      new Login('gencayburcu@gmail.com', 'eyşan'),
      new Login('idb@gmail.com', 'cesur'),
      new Login('test1', 'a'),
    ];
    const serverResponse = userList.filter(
      (loginInfo) =>
        loginInfo.getUserInfo().mail == loginUser.getUserInfo().mail
    );
    if (serverResponse.length == 0) {
      return 'not_match';
    }
    if (
      serverResponse[0].getUserInfo().password !=
      loginUser.getUserInfo().password
    ) {
      return 'wrong_pass';
    }

    this.loginSer.successfulLogin();
    return 'all_true';
  }
}
