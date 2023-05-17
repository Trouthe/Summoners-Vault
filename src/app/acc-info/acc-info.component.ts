import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.component.html',
  styleUrls: ['./acc-info.component.css'],
})
export class AccInfoComponent {

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.http.get(this.getAccs).subscribe((ListAccounts) => {
  //     this.accounts = ListAccounts;
  //   });
  // }

  uid: string | null = this.authService.getUID();

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (!this.uid) {
      this.router.navigate(['/login']);
    }
  }
}
