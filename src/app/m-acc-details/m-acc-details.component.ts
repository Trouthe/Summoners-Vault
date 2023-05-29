import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-m-acc-details',
  templateUrl: './m-acc-details.component.html',
  styleUrls: ['./m-acc-details.component.css']
})
export class MAccDetailsComponent {
  acc: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const state = window.history.state;
    this.acc = state && state.account;
    
    if (this.acc) console.log(this.acc);
    
  }
}
