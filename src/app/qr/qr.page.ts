import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.startScanner()
  }

  async startScanner(){
    const result = await BarcodeScanner.startScan();
  }

}
