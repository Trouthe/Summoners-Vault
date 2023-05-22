import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {

  m_Accounts: any[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // is logged in?
    if (!this.authService.isloggedIn())
      this.router.navigate(['/login']);

    this.getAccountsToSell();
  }

  getAccountsToSell(): void {
    this.http.get<any>(environment.marketplaceAccounts).subscribe(
      (response) => {
        console.log(response); // Log the response data
        this.m_Accounts = response;
      },
      (error) => {
        console.error('Failed to retrieve accounts:', error);
      }
    );
  }

  logoutFunction() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
