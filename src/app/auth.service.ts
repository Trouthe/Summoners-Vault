import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.user_information;
  authenticated = false;
  uid: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.get(`${this.apiUrl}?user=${username}&pass=${password}`).subscribe(response => {
      // if (response && response[0]) {
      //   this.authenticated = true;
      //   this.uid = response[0].UID;
        this.router.navigate(['/accountinfo']);
      // }
    });
  }

  logout() {
    this.authenticated = false;
    this.uid = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.isAuthenticated;
  }
}
