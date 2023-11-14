import { Injectable } from '@angular/core';
import { SelectedRestaurant } from '../interfaces/selected-restaurant';
import { RestList } from 'src/classes/rest-list';

@Injectable({
  providedIn: 'root',
})
export class SelectedRestService {
  selectedRestaurant: RestList = new RestList('', 0, 0, [], []);
  constructor() {}

  selectRestaurant(restInfo: RestList) {
    this.selectedRestaurant = restInfo;

    /* localStorage.setItem(
      'selected-restaurant',
      JSON.stringify(this.selectedRestaurant)
    );*/
  }
  getSelectedRestaurant(): RestList {
    /* const data = localStorage.getItem('selected-restaurant');
    if (data) {
      return JSON.parse(data);
    }*/
    return this.selectedRestaurant;
  }
}
