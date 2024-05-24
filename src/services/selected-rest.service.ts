import { Injectable } from '@angular/core';
import { SelectedRestaurant } from '../interfaces/selected-restaurant';
import { RestList } from 'src/classes/rest-list';
import { Restaurant } from 'src/types/restaurantType';
import { Table } from 'src/types/tableType';

@Injectable({
  providedIn: 'root',
})
export class SelectedRestService {
  selectedRestaurant: Restaurant = {
    name: '',
    address: '',
    menu: [],
    tableList: [],
    totalCapacity: 0,
    customerCount: 0,
  };
  constructor() {}

  selectRestaurant(restInfo: Restaurant) {
    this.selectedRestaurant = restInfo;
    console.log('seçilen:', this.selectedRestaurant);

    /* localStorage.setItem(
      'selected-restaurant',
      JSON.stringify(this.selectedRestaurant)
    );*/
  }
  getSelectedRestaurant(): Restaurant {
    /* const data = localStorage.getItem('selected-restaurant');
    if (data) {
      return JSON.parse(data);
    }*/
    console.log("seçilen dönüyor", this.selectedRestaurant)
    return this.selectedRestaurant;
  }
}
