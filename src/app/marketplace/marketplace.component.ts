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

  // Track which account is selected
  selectedAccountIndex: number | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // is logged in?
    if (!this.authService.isloggedIn())
      this.router.navigate(['/login']);

    this.getAccountsToSell();

    // Init keyup
    document.addEventListener('keyup', this.handleKeyPress.bind(this));
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

  changePerspective(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const image = target.querySelector('.image') as HTMLElement;
    const rect = target.getBoundingClientRect();

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const rotateX = 25 * ((offsetY - rect.height / 2) / rect.height);
    const rotateY = 25 * ((offsetX - rect.width / 2) / rect.width);

    image.style.filter = 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))';
    image.style.transform = `
      rotateX(${rotateX}deg) rotateY(${rotateY}deg)
      scale(1.4)
    `;
  }

  resetPerspective(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const image = target.querySelector('.image') as HTMLElement;

    image.style.transform = '';
    image.style.filter = '';
  }

  extractNumbersFromString(str: string): string {
    return str.replace(/[0-9\s]+/g, '')
  }

  // Is it the close button?
  togglePopup(index: number, close?: boolean): void {
    if (close) {
      // Close the popup
      this.selectedAccountIndex = null
    } else {
      // Show the popup for the clicked account
      this.selectedAccountIndex = index
    }
  }

  isPopupVisible(index: number): boolean {
    return this.selectedAccountIndex === index
  }

  // Close with ESC
  handleKeyPress(event: KeyboardEvent) {
    // Only reset the value if it's not null
    if (this.selectedAccountIndex != null) {
      if (event.key === 'Escape')
        this.selectedAccountIndex = null
    }
  }
}