import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ServicesService } from '../services.service';

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

  uid: number | null = this.authService.getUID();
  loading: boolean = false;
  loadInterval: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private serv: ServicesService
  ) { }

  checkLoading(): void {
    if (this.serv.getLoading()) {
      this.loading = true;
      this.loadInterval = setTimeout(() => {
        console.log('checking again...')
        this.checkLoading();
      }, 400); // Delay in milliseconds before checking again
    } else {
      this.loading = false;
      clearTimeout(this.loadInterval);
    }
  }

  ngOnInit(): void {
    this.checkLoading();
    
    // is logged in?
    if (!this.authService.isloggedIn()) 
      this.router.navigate(['/login']);
  }

  logoutFunction() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
