import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CustomerTypeService } from 'src/services/customer-type.service';
import { menuItem } from 'src/types/menuItemType';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: menuItem[] = [];
  /*public appPages = [
    { title: 'Anasayfa', url: 'home', icon: 'home' },
    { title: 'Anasayfa', url: 'home-after-order', icon: 'home' },
    { title: 'Anasayfa', url: 'waiter-home', icon: 'home' },
    { title: 'Kartlar', url: 'payment', icon: 'card' },
    { title: 'QR Tara', url: 'qr', icon: 'qr-code' },
    { title: 'Ödeme Geçmişi', url: 'order-history', icon: 'wallet' },
    { title: 'Ayarlar', url: 'settings', icon: 'settings' },
    { title: 'Çıkış Yap', url: 'login', icon: 'log-out' },
  ]; */
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private customerType: CustomerTypeService
  ) {
    this.authService.isLoggedIn.subscribe((state) => {
      this.isLoggedIn = state;
    });
    this.customerType.currentSideBar.subscribe((state) => {
      this.appPages = state;
    });
  }
}
