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
    // is logged in?
    if (!this.authService.isloggedIn()) 
      this.router.navigate(['/login']);
  }

  logoutFunction() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
