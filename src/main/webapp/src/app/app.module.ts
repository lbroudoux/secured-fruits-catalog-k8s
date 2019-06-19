import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationServiceProvider } from './services/auth.service';
import { AuthenticationHttpInterceptor } from './services/auth.http-interceptors';
import { HomePageComponent } from './pages/home/home.page';

@NgModule({
  imports: [
    BrowserModule, FormsModule, BsDropdownModule.forRoot(), ModalModule.forRoot(), TabsModule.forRoot(), TooltipModule.forRoot(), 
    HighlightModule.forRoot({ theme: 'github' }), AppRoutingModule, HttpClientModule
  ],
  declarations: [
    AppComponent, HomePageComponent
  ],
  providers: [
    AuthenticationServiceProvider, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationHttpInterceptor,
      multi: true
    }
  ],
  entryComponents: [
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
