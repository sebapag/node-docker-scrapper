var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'work-account'});

exports.addObject = function (key, obj) {
  return new Promise(function (resolve, reject) {

    var s3 = new AWS.S3();
    // I nomi dei bucket devono essere univoci per tutti gli utenti S3
    var myBucket = 'seshat-sebastianopagani';
    
    params = {Bucket: myBucket, Key: key, Body: JSON.stringify(obj)};

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
      }
    });
  });
}

exports.readObject = function (table, obj) {
  return new Promise(function (resolve, reject) {
    if (obj != undefined && obj != undefined) {
      var params = {
        TableName: table,
        Key: {
          "year": year,
          "title": title
        }
      };

      docClient.get(params, function (err, data) {
        if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          reject();
        } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          resolve();
        }
      });
    }
  })
}

exports.queryTable = function (table, query) {
  return new Promise(function (resolve, reject) {
    var params = {
      TableName: table,
      ProjectionExpression: query.ProjectionExpression,
      KeyConditionExpression: query.KeyConditionExpression,
      ExpressionAttributeNames: query.ExpressionAttributeNames,
      ExpressionAttributeValues: query.ExpressionAttributeValues
    };

    docClient.query(params, function (err, data) {
      if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject();
      } else {
        debugger;
        resolve();
      }
    });
  })
}