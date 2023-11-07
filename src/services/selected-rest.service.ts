import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedRestService {
  selectedRestaurant: SelectedRestaurant = { name: '', rate: '' };
  constructor() {}

  selectRestaurant(restInfo: any) {
    this.selectedRestaurant.name = restInfo.name;
    this.selectedRestaurant.rate = restInfo.rate;

    localStorage.setItem(
      'selected-restaurant',
      JSON.stringify(this.selectedRestaurant)
    );
  }
  getSelectedRestaurant(): SelectedRestaurant {
    const data = localStorage.getItem('selected-restaurant');
    if (data) {
      return JSON.parse(data);
    }
    return this.selectedRestaurant;
  }
}

interface SelectedRestaurant {
  name: string;
  rate: string;
}
