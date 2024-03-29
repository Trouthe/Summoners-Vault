import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { MAccDetailsComponent } from './m-acc-details/m-acc-details.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccInfoComponent,
    InfoCardComponent,
    LoginpageComponent,
    SpinnerComponent,
    AddAccountComponent,
    MarketplaceComponent,
    MAccDetailsComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
