import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css'],
})
export class AccInfoComponent {

  // constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.get(this.getAccs).subscribe((ListAccounts) => {
    //   this.accounts = ListAccounts;
    // });
  }
}
