import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LoginResponse {
  exists: boolean;
  uid?: string;
}

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent {
  email!: string;
  password!: string;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private router: Router
    ) { }

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
          const _verif = (response as any).exists;
          const _uid = (response as any).uid;
          // Handle the successful login response
          // this.authService.setUID(response.uid);
          console.log('Login successful');
          this.authService.setUID(_uid);
          if (_verif) {
            this.router.navigate(['/accountinfo']);
          } else {
            this.router.navigate(['/login']);
          }
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
