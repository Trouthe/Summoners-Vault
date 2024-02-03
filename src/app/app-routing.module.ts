import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignupComponent } from './signup/signup.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { MAccDetailsComponent } from './m-acc-details/m-acc-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'accountinfo', component: AccInfoComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-account', component: AddAccountComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'marketplace/:accountId', component: MAccDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
