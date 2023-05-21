import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AddAccountComponent } from './add-account/add-account.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'accountinfo', component: AccInfoComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'add-account', component: AddAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
