import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Anasayfa', url: 'home', icon: 'home' },
    { title: 'Anasayfa', url: 'home-after-order', icon: 'home' },
    { title: 'Anasayfa', url: 'waiter-home', icon: 'home' },
    { title: 'Kartlar', url: 'payment', icon: 'card' },
    { title: 'QR Tara', url: 'qr', icon: 'qr-code' },
    { title: 'Ödeme Geçmişi', url: 'order-history', icon: 'wallet' },
    { title: 'Ayarlar', url: 'settings', icon: 'settings' },
    { title: 'Çıkış Yap', url: 'login', icon: 'log-out' },
  ];
}
