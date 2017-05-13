import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';


import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import {MessagesService} from './messages/messages.service';


// Define the routes
const ROUTES = [
  {
    path: '', redirectTo: 'messages', pathMatch: 'full',
  },
  {
    path: 'messages', component: MessagesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [ MessagesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
