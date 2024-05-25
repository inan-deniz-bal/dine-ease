import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { menuItem } from 'src/types/menuItemType';
@Injectable({
  providedIn: 'root',
})
export class CustomerTypeService {
  private customerBeforeOrder = [
    { title: 'Anasayfa', url: 'home', icon: 'home' },
    { title: 'Kartlar', url: 'payment', icon: 'card' },
    { title: 'QR Tara', url: 'qr', icon: 'qr-code' },
    { title: 'Ödeme Geçmişi', url: 'order-history', icon: 'wallet' },
    { title: 'Ayarlar', url: 'settings', icon: 'settings' },
    { title: 'Çıkış Yap', url: 'login', icon: 'log-out' },
  ];

  private customerAfterOrder = [
    { title: 'Anasayfa', url: 'home-after-order', icon: 'home' },
    { title: 'Kartlar', url: 'payment', icon: 'card' },
    { title: 'QR Tara', url: 'qr', icon: 'qr-code' },
    { title: 'Ödeme Geçmişi', url: 'order-history', icon: 'wallet' },
    { title: 'Ayarlar', url: 'settings', icon: 'settings' },
    { title: 'Çıkış Yap', url: 'login', icon: 'log-out' },
  ];

  private waiterBar = [
    { title: 'Anasayfa', url: 'waiter-home', icon: 'home' },
    {title:"Yönetim",url:"admin-page",icon:"restaurant"},
    { title: 'Çıkış Yap', url: 'login', icon: 'log-out' },
  ];

  private sideBar = new BehaviorSubject<menuItem[]>([]);

  setWaiter() {
    localStorage.setItem('menu-type', 'waiter');
    this.sideBar.next(this.waiterBar);
  }

  setCustomerB() {
    localStorage.setItem('menu-type', 'before');
    this.sideBar.next(this.customerBeforeOrder);
  }

  setCustomerA() {
    localStorage.setItem('menu-type', 'after');
    this.sideBar.next(this.customerAfterOrder);
  }

  setNull() {
    localStorage.removeItem('menu-type');
    this.sideBar.next([]);
  }
  get currentSideBar() {
    const storedMenuItem = localStorage.getItem('menu-type');


    if (storedMenuItem !== null) {

      if (storedMenuItem == 'waiter') {
        this.sideBar.next(this.waiterBar);
      } else if (storedMenuItem == 'before') {
        this.sideBar.next(this.customerBeforeOrder);
      } else {
        this.sideBar.next(this.customerAfterOrder);
      }
    }

    return this.sideBar.asObservable();
  }

  constructor() {}
}
