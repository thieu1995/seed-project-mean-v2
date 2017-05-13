https://github.com/AngularClass/awesome-angular#material-design
https://sherweb.github.io/ng2-materialize/checkbox

========================= Tut =================

Component	ng g component my-new-component
Directive	ng g directive my-new-directive
Pipe	    ng g pipe my-new-pipe
Service	  ng g service my-new-service
Class	    ng g class my-new-class
Guard	    ng g guard my-new-guard
Interface	ng g interface my-new-interface
Enum	    ng g enum my-new-enum
Module	  ng g module my-module



============================ Cài đặt Angular-Cli mới nhất ===========================
https://github.com/angular/angular-cli

  npm install -g @angular/cli
  ng new contact_app_client
  cd contact_app_client
  ng serve              //option:  ng serve --host 0.0.0.0 --port 4201

- Nếu đã cài đặt angular-cli thì nên update đến bản mới nhất.
  npm uninstall -g angular-cli
  npm uninstall --save-dev angular-cli

- Update global (trên máy tính)
  npm uninstall -g @angular/cli
  npm cache clean
  npm install -g @angular/cli@latest

- Update local (Trong project đã có sẵn angular-cli)
  rm -rf node_modules dist # use rmdir /S/Q node_modules dist in Windows Command Prompt; use rm -r -fo node_modules,dist in Windows PowerShell
  npm install --save-dev @angular/cli@latest
  npm install



======================== Cài đặt Materialize-Css trên project ====================
https://www.npmjs.com/package/angular2-materialize

  npm install materialize-css --save
  npm install angular2-materialize --save

  npm install jquery@^2.2.4 --save    (Nếu nó đã cài luôn Jquery và Hammerjs rồi thì thôi, còn chưa thì cài thêm)
  npm install hammerjs --save


Edit the angular-cli.json : Chỗ

  styles: [
    "../node_modules/materialize-css/dist/css/materialize.css"
  ],

  scripts: [
    "../node_modules/jquery/dist/jquery.js",
    "../node_modules/hammerjs/hammer.js",
    "../node_modules/materialize-css/dist/js/materialize.js"
  ]


Add to the top of app.module.ts
  import { MaterializeModule } from 'angular2-materialize';


Add MaterializeModule trong (app.module.ts):
 imports: [
    MaterializeModule,
    ...
 ]


Add this line to header of index.html
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">




================================= Install Express ========================================

  npm install --save express body-parser morgan cookie-parser

touch app.js
  // Get dependencies
  const express = require('express');
  const path = require('path');
  const http = require('http');
  const logger = require('morgan');
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');

  // Get our API routes
  const apiMessage = require('./server/routes/apiMessage');
  const app = express();

  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use(logger('dev'));
  // Parsers for POST data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  // Point static path to dist
  app.use(express.static(path.join(__dirname, 'dist')));

  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
  });

  // Set our api routes
  app.use('/apiMessage', apiMessage);
  // Catch all other routes and return the index file
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  /**
   * Get port from environment and store in Express.
   */
  const port = process.env.PORT || '3000';
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function(){
    console.log("API running on localhost: " + port);
  });




  mkdir server
  cd server
  mkdir routes


touch apiMessage.js (server/routes/apiMessage.js)

  const express = require('express');
  const router = express.Router();
  /* GET api listing. */
  router.get('/', function (req, res){
    res.send('api message works');
  });
  module.exports = router;


  ng build  (To auto create dist/index.html)
  node app.js

  goto: localhost:3000, localhost:3000/apiUser, localhost:3000/apiMessage


- Note: Ở đây ta sẽ rất hơi khó hiểu là thế cái file : index.html trong thư mục: src/index.html dùng để làm gì.

- Ta cần phân biệt rõ: Cái file index đó code đang ở dạng es6, typescript (của angular)
- Sau khi ta dùng lệnh: ng build thì nó sẽ build các component của angular, và file index.html đó thành 1 file: index.html trong folder: dist
- Cái file dist/index.html này mới là file cần để chạy website.

- Do đó khi dùng server của express. Ta trỏ nó về dist/index.html để nó serve thằng này, chứ không phải thằng src/index.html


- Giờ ta sửa script vào package.json để chỉ cần gõ 1 lần là được: "build": "ng build  && node app.js",



================================== MongoDb =======================================
1. Download va Install MongoDb
    https://www.mongodb.com/
    http://mongoosejs.com/docs/guide.html

2. Run
    mongod
    mongo

3. Mongoose
    Schemas and Models
    Validation
    Intuitive Database operations

    npm install --save mongoose mongoose-unique-validator
    npm install --save bcryptjs jsonwebtoken


4. Fix app.js

  const mongoose = require("mongoose");

  // Get our API routes
  const apiMessage = require('./server/routes/apiMessage');
  const app = express();

  mongoose.connect("localhost:27017/mean-v2");


5. Creating schema

    cd server
    mkdir models
    touch message.js, user.js


message.js :
    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    var messageSchema = new Schema({
      content: { type: String, required: true },
      author: { type: String, required: true }
    });
    module.exports = mongoose.model("Message", messageSchema);



6. Fixing router
- Write down in: routes/apiMessage.js

  const express = require('express');
  const router = express.Router();
  const Message = require("../models/message");

  // localhost:3000/apiMessage
  router.get("/", function(req, res, next) {

    Message.find({}, function(err, messages) {
      if(err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: "Success",
        obj: messages
      })
    });

  });


  // localhost:3000/apiMessage
  router.post('/', function (req, res, next) {

    const x = Math.random();
    const y = Math.floor((Math.random() * 10) + 1);

    var message = new Message({
      content: "" + x,
      author: "ThieuNv " + y
    });
    message.save(function (err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(201).json({
        message: 'Saved message',
        obj: result
      })
    });

  });

  module.exports = router;


7. Thêm Message vào database mongo

  Open terminal (Ctrl + Alt + T)
  mongo
  show dbs

  use mean-v2
  show collections

  db.messages.insert({"content": "ThieuNv xin chao", "author": "ThieuNv"});
  db.messages.insert({"content": "Today is the best day of my life!", "author": "Hoang Beu"});
  db.messages.insert({"content": "Karik just get new award for single singer!", "author": "Unknow"});


  Run app:  npm run build
  Goto:     localhost:3000/apiMessage



=========================== Connect Angular 2 App with Api Express Nodejs  ================================
1. Angular route, component and provider
  ng g c messages


Add to app.module.ts (App line of import )

  // Define the routes
  const ROUTES = [
    {
      path: '', redirectTo: 'messages', pathMatch: 'full',
    },
    {
      path: 'messages', component: MessagesComponent
    }
  ];


Add this line in:
    import : [
      ...
      RouterModule.forRoot(ROUTES) // Add routes to the app
    ]


Add to app.component.html
  <div class="container">
    <div class="row">
      <router-outlet></router-outlet>
    </div>
  </div>

Run app:  npm run build
Goto:     localhost:3000 (test)



2. Connecting Component to Express API
  cd src/app/messages
  ng g s messages     (ng generate service messages)

Add this line in :
  providers: [ MessagesService ],


Make http call in service to express server:

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


Inject Service in component Messages:

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




And finally, we'll just display the posts in the view. (messages.component.html)

  <div class="col lg 4" *ngFor="let message of messages">
    <div class="card" >
      <h4 class="card-title"> New </h4>
      <div class="card-content">
        <p> {{message.content}} </p>
      </div>
      <div class="card-action">
        <span>Author: </span><a href="#"> {{message.author}} </a>
      </div>

    </div>
  </div>


Add more css to be cool.(messages.component.css)
  .card-title {
    color: red;
    padding: 10px 0 10px 15px;
    background-color: #cecece;
  }


---> Vậy là quá trình tạo project MEAN-V2 đã hoàn thành.

- Note: Giờ mỗi khi chạy lại code ta phải: npm run build
- Còn nếu bạn: npm run start có nghĩa là bạn đang chạy code của file src/index.html (không phải của server nodejs)




