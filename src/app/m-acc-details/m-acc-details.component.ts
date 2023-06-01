import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Location } from '@angular/common';

@Component({
  selector: 'app-m-acc-details',
  templateUrl: './m-acc-details.component.html',
  styleUrls: ['./m-acc-details.component.css'],
})
export class MAccDetailsComponent {
  accData: any;

  constructor(
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    const url = environment.checkoutAccount + '?acc_id=' + this.acc_id();

    this.http.get(url).subscribe(Data => this.accData = Data);

    setTimeout(() => {
      console.log(this.accData);
    }, 500);
  }

  acc_id(): string {
    const url = this.location.path(); // local url
    const segments = url.split('/');
    const id = segments[segments.length - 1];
    
    return id;
  }

  extractNumbersFromString(str: string): string {
    if (str) {
      return str.replace(/[0-9\s]+/g, '');
    }
    return 'UNRANKED';
  }
  

  isCardVisible = false;
  isPaypalVisible = false;
  
  showCard() {
    this.isCardVisible = true;
    this.isPaypalVisible = false;
  }

  showPaypal() {
    this.isCardVisible = false;
    this.isPaypalVisible = true;
  }

  goBack() {this.location.back()}
}
