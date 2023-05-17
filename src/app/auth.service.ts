import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid!:string | null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // Replace with your REST API endpoint for login
    const loginUrl = environment.login;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('mail', email);
    body.set('password', password);

    console.log (body.toString())
    return this.http.post(loginUrl, body.toString(), { headers });
  }

  // set/get
  setUID (uid:string): void {this.uid = uid}
  getUID (uid:string): string {return uid}

  logout(): void {this.uid = null}

  isloggedIn ():boolean {
    // check if UID exists
    return !!this.uid
  }
}
