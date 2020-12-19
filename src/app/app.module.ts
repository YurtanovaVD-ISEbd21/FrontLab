import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LandingComponent } from './components/landing/landing.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { OauthSuccessComponent } from './components/oauth-success/oauth-success.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PagenotfoundComponent,
    OauthSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
