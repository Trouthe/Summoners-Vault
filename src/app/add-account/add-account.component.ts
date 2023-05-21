import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  
  uid: string | null = this.authService.getUID();
  accVerification: string = 'no';
  serverOptions: any = ['Europe West','Europe Nodric East', 'North America'];
  
  constructor (
    private authService: AuthService,
    private router: Router,
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
