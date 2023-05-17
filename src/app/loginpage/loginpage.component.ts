import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent {
  email!: string;
  password!: string;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit ():void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
      .subscribe(
        response => {
          // Handle the successful login response
          console.log('Login successful');
          console.log(response);
        },
        error => {
          // Handle the login error
          console.error('Login failed');
          console.error(error);
        }
      );
    }
  }
}
