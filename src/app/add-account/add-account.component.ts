import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent {
  uid: string | null = this.authService.getUID();

  accountForm!: FormGroup;
  showEmailFields: boolean = false;

  accountName!: FormControl;
  accountPassword!: FormControl;
  summonerDisplayName!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // is logged in?
    if (!this.authService.isloggedIn()) this.router.navigate(['/login']);

    this.initializeForm();
  }

  initializeForm() {
    this.accountName = new FormControl('', Validators.required);
    this.accountPassword = new FormControl('', Validators.required);
    this.summonerDisplayName = new FormControl('', Validators.required);

    this.accountForm = this.formBuilder.group({
      userID: this.uid,
      accountName: this.accountName,
      accountPassword: this.accountPassword,
      summonerDisplayName: this.summonerDisplayName,
      emailVerification: 0,
      accountEmail: '',
      accountEmailPassword: '',
      server: 'EUW1',
      blueEssence: 0,
      orangeEssence: 0,
      riotPoints: 0,
      skins: 0,
      accountLevel: 0,
      championsOwned: 0,
      accLvlType: '',
      acctosell: false,
    });
  }

  toggleAcctosell() {
    const formValues = this.accountForm.value;
    // Convert the boolean value to 0 or 1
    const acctosellValue = formValues.acctosell ? 1 : 0;
    // Update the form value with the converted value
    this.accountForm.patchValue({ acctosell: acctosellValue });


    console.log(acctosellValue)
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const formValues = this.accountForm.value;
      console.log(formValues);

      // turn it readable for the php database
      const formData = new FormData();
      for (const key in formValues) {
        formData.append(key, formValues[key]);
      }

      this.http
        .post(
          'https://spicysalmon.000webhostapp.com/insertAccount.php',
          formData,
          { responseType: 'text' }
        )
        .subscribe(
          () => {
            console.log('Data inserted successfully!');
          },
          (error) => {
            console.error('Failed to insert data:', error);
          }
        );
      // Reset the form and keep the default selected values
      this.accountForm.reset({
        userID: this.uid,
        emailVerification: formValues.emailVerification,
        accountEmail: '',
        accountEmailPassword: '',
        server: 'EUW1',
        blueEssence: 0,
        orangeEssence: 0,
        riotPoints: 0,
        skins: 0,
        accountLevel: 0,
        championsOwned: 0,
        accLvlType: '',
        acctosell: false,
      });
    } else {
      // Mark all form controls as touched to display validation errors
      this.markAllFormControlsAsTouched();
    }
  }

  markAllFormControlsAsTouched() {
    Object.values(this.accountForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  logoutFunction() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
