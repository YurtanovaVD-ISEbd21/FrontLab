import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './components/auth/auth.module';

import { LandingComponent } from './components/landing/landing.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { OauthSuccessComponent } from './components/oauth-success/oauth-success.component';

const routes: Routes = [
  { path: "home", component: LandingComponent },
  { path: "cars", loadChildren: './components/cars/cars.module#CarsModule' },
  { path: "admin", loadChildren: './components/admin/admin.module#AdminModule' },
  { path: "auth", loadChildren: './components/auth/auth.module#AuthModule' },
  { path: "oauthSuccess", component: OauthSuccessComponent},
  { path: "404", component: PagenotfoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
