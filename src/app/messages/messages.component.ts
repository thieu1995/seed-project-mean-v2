import { Component, OnInit } from '@angular/core';
import {MessagesService} from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any = [];

  constructor(private messagesService: MessagesService ) { }

  ngOnInit() {
    // Retrieve message from the API
    this.messagesService.getAllMessages().subscribe(
      (res: any) => {
      this.messages = res.obj;
    });
  }
}
