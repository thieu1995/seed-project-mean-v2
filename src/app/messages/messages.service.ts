import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagesService {

  constructor(private http: Http) {
  }

  // Get all messages from the API
  getAllMessages() {
    return this.http.get('/apiMessage')
      .map(res => res.json());
  }
}

