import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private uid!:string | null;

  // TESTING PUPOSES
  private uid: number | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Replace with your REST API endpoint for login
    const loginUrl = environment.login;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('mail', email);
    body.set('password', password);

    console.log(body.toString());
    return this.http.post(loginUrl, body.toString(), { headers });
  }

  signup(email: string, password: string) {
    const data = { email, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('user', email); 
    body.set('pass', password);

    console.log(body.toString());
    return this.http.post(environment.signup, body.toString(), { headers });
  }

  // set/get
  setUID(uid: number): void {
    this.uid = uid;
  }
  getUID(): number | null {
    return this.uid;
  }

  // reset uid
  logout(): void {
    this.uid = null;
  }

  isloggedIn(): boolean {
    // check if UID exists
    return !!this.uid;
  }
}
