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
