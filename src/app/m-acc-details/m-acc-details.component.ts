import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-m-acc-details',
  templateUrl: './m-acc-details.component.html',
  styleUrls: ['./m-acc-details.component.css'],
})
export class MAccDetailsComponent {
  uid: number | null = this.authService.getUID();

  accData: any;
  checkoutForm!: FormGroup;
  accID!: any;
  tosell!: any;
  loggedIn:boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private location: Location,
    private FormBuilder: FormBuilder,
    private router: Router
  ) {}

  ngAfterContentInit() {
    const url = environment.checkoutAccount + '?acc_id=' + this.acc_id();

    this.http.get<any>(url).subscribe(Data => {
      this.accData = Data;
      this.accID = Data[0].acc_id;
      this.tosell = Data[0].acctosell;
    });
      
    if (this.uid) {
      this.loggedIn = true;
    }

    setTimeout(() => {
      console.log(this.accData);
      console.log("accid: " + this.accID);

      if (this.tosell == '0') {
        this.router.navigate(['/marketplace']);
      }
    }, 250);

    this.checkoutForm = this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      cardholderName: [''],
      cardNumber: [''],
      expDate: [''],
      cvc: [''],

      paypalEmail: ['',]
    });

    console.log(this.uid)
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

    if (this.isCardVisible) {
      this.checkoutForm.get('cardholderName')!.setValidators([Validators.required]);
      this.checkoutForm.get('cardNumber')!.setValidators([Validators.required]);
      this.checkoutForm.get('expDate')!.setValidators([Validators.required]);
      this.checkoutForm.get('cvc')!.setValidators([Validators.required]);
    } else {
      this.checkoutForm.get('cardholderName')!.clearValidators();
      this.checkoutForm.get('cardNumber')!.clearValidators();
      this.checkoutForm.get('expDate')!.clearValidators();
      this.checkoutForm.get('cvc')!.clearValidators();
    }

    this.checkoutForm.get('cardholderName')!.updateValueAndValidity();
    this.checkoutForm.get('cardNumber')!.updateValueAndValidity();
    this.checkoutForm.get('expDate')!.updateValueAndValidity();
    this.checkoutForm.get('cvc')!.updateValueAndValidity();
  }

  showPaypal() {
    this.isCardVisible = false;
    this.isPaypalVisible = true;

    if (this.isPaypalVisible) {
      this.checkoutForm.get('paypalEmail')!.setValidators([Validators.required, Validators.email]);
    } else {
      this.checkoutForm.get('paypalEmail')!.clearValidators();
    }
    this.checkoutForm.get('paypalEmail')!.updateValueAndValidity();
  }

  goBack() {this.router.navigate(['/marketplace']);}

  purchase() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('uid', this.uid != null ? this.uid.toString() : '');
    body.set('accid', this.accID != null ? this.accID.toString() : '');

    console.log(body.toString());
  
    this.http.post<any>(environment.purchase, body.toString(), { headers }).subscribe(
      (response) => {
        this.router.navigate(['/accountinfo']);
        console.log(response);
      }
    );
  }
}
