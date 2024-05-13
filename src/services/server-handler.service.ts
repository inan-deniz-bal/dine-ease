import { Injectable } from '@angular/core';
import { RestList } from 'src/classes/rest-list';
import { Login } from 'src/classes/login';
import { Menu } from 'src/interfaces/menu';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/interfaces/customer';
import { Restaurant } from 'src/types/restaurantType';
import { Table } from 'src/types/tableType';
@Injectable({
  providedIn: 'root',
})
export class ServerHandlerService {
  constructor(private loginSer: LoginService, private http: HttpClient) {}

  //apiUrl = 'http://localhost:3000/api/v1';

  apiUrl="https://node1-1-ri4g.onrender.com/api/v1"



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

  burcuMenu: Menu[] = [
    {
      mealType: 'Simitler ve Boyozlar',
      meals: [
        {
          mealName: 'Simit',
          mealPrice: 10,
          mealCount: 20,
          ingridients: [''],
        },
        {
          mealName: 'Tereyağlı Simit',
          mealPrice: 10,
          mealCount: 5,
          ingridients: [''],
        },
        {
          mealName: 'Boyoz',
          mealPrice: 10,
          mealCount: 5,
          ingridients: [''],
        },
        {
          mealName: 'Çikolatalı Boyoz',
          mealPrice: 15,
          mealCount: 5,
          ingridients: ['Nutella Çikolata'],
        },
      ],
    },
    {
      mealType: 'Poğaçalar ve Açmalar',
      meals: [
        {
          mealName: 'Karaköy Poğaçası',
          mealPrice: 10,
          mealCount: 20,
          ingridients: [''],
        },
        {
          mealName: 'Sosisli Poğaça',
          mealPrice: 15,
          mealCount: 5,
          ingridients: ['Sosis'],
        },
        {
          mealName: 'Zeytinli Poğaça',
          mealPrice: 12,
          mealCount: 5,
          ingridients: ['Zeytin'],
        },
        {
          mealName: 'Domatesli Kaşarlı Poğaça (Acar)',
          mealPrice: 13,
          mealCount: 5,
          ingridients: ['Domates', 'Kaşar'],
        },
        {
          mealName: 'Sade Açma',
          mealPrice: 10,
          mealCount: 5,
          ingridients: [''],
        },
        {
          mealName: 'Zeytinli Açma',
          mealPrice: 14,
          mealCount: 5,
          ingridients: ['Zeytin'],
        },
      ],
    },
    {
      mealType: 'Sandviçler ve Tostlar',
      meals: [
        {
          mealName: 'Simit Tost',
          mealPrice: 20,
          mealCount: 20,
          ingridients: ['Kaşar', 'Domates'],
        },
        {
          mealName: 'Kumru',
          mealPrice: 70,
          mealCount: 5,
          ingridients: ['Sosis', 'Sucuk', 'Kaşar', 'Turşu'],
        },
        {
          mealName: 'Çok Peynirli Tost',
          mealPrice: 60,
          mealCount: 3,
          ingridients: ['Kaşar', 'Tulum', 'Cheddar', 'Krem Peyniri'],
        },
        {
          mealName: 'Karışık Tost',
          mealPrice: 50,
          mealCount: 5,
          ingridients: ['Sucuk', 'Kaşar', 'Turşu'],
        },
      ],
    },
  ];

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
        this.burcuMenu
      ),
    ];
    return rets;
  }

  getWorkersRestaurant(): RestList {
    return new RestList(
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
      this.burcuMenu
    );
  }
  /*
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
  }*/
  getRestaurantMenu(): Menu[] {
    return this.burcuMenu;
  }

  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers/login`, data.getUserInfo());
  }
  signUp(user: Customer): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers/`, user);
  }

  getPastOrders(): Observable<any> {
    const userID = this.loginSer.getUser();
    return this.http.get(`${this.apiUrl}/pastOrders/${userID}`);
  }

  getAllRestaurants(): Observable<{ status: string; data: Restaurant[] }> {
    return this.http.get<{ status: string; data: Restaurant[] }>(
      `${this.apiUrl}/restaurants`
    );
  }

  getTablesForRestaurant(restaurantID: string): Observable<{ status: string; data:Table[] }> {
    return this.http.get<{ status: string; data: Table[] }>(
      `${this.apiUrl}/restaurants/tables/${restaurantID}`
    );
  }
}
