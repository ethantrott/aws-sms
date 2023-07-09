var AWS = require('aws-sdk');

const config = require("./config.json")

AWS.config.update({ "accessKeyId": config['aws-id'], "secretAccessKey": config['aws-secret'], "region": config.region });

function send(message, phoneNumber){
  var params = {
    Message: message,
    PhoneNumber: phoneNumber
  };
  
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
  
  publishTextPromise.then(
    function(data) {
      console.log("MessageID is " + data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
}

send("test", config['phone-number']);