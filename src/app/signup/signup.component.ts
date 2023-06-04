import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

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

      this.authService.signup(email, password)
      .subscribe(
        (response) => {
          console.log('Signup successful');

          // Get UID and authenticate
          this.authService.login (email, password)
          .subscribe (
            (authResponse) => {
              const _verif = (authResponse as any).exists;
              const _uid = (authResponse as any).uid;
              
              this.authService.setUID(_uid);
              if (_verif) {
                this.router.navigate(['/accountinfo']);
              } else {
                this.router.navigate(['/login']);
              }
            }, (error) => {
              console.error('Transition Error');
              console.error(error);
            }
          );
          console.log(response);
        },
        (error) => {
          // Handle the login error
          console.error('Signup failed');
          console.error(error);
        }
      );
    } else {
      console.log('Invalid Form')
    }
  }

}
