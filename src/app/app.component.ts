import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Rehome', url: 'home-after-order', icon: 'home' },
    { title: 'Waiter Home', url: 'waiter-home', icon: 'home' },
    { title: 'Payment', url: 'payment', icon: 'card' },
    { title: 'Scan QR', url: 'qr', icon: 'qr-code' },
    { title: 'Payment History', url: 'order-history', icon: 'wallet' },
    { title: 'Settings', url: 'settings', icon: 'settings' },
    { title: 'Logout', url: 'login', icon: 'log-out' },
  ];
}
