import { Component, OnInit } from '@angular/core';
import { SelectedRestaurant } from 'src/interfaces/selected-restaurant'; //belki bunun yerine restlist de kullanılabilir
import { SelectedRestService } from 'src/services/selected-rest.service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  selectedRestaurant: SelectedRestaurant = {
    name: '',
    rate: '',
  };

  constructor(private selectedRest: SelectedRestService) {}

  ngOnInit() {

    this.selectedRestaurant=this.selectedRest.getSelectedRestaurant();
  }
}
