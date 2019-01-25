'use strict';

const AWS = require('aws-sdk'),
       rp = require('request-promise');

// Setup AWS to write to S3
const config = new AWS.Config({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

AWS.config.update(config);

const s3 = new AWS.S3();

// Insert your key
let datafileKey = 'TxLUGAK7LV6FVp8BZikMgw';
let dataFileUrl = `https://cdn.optimizely.com/datafiles/${datafileKey}.json`;
let options = {
  uri: dataFileUrl,
  json: true
}

// Lambda function called when webhook is called
exports.handler = (event, context) => {

  // Request datafile
  rp(options)
    .then((datafile) => {
      console.log('Here\'s the datafile: ', datafile);

      let params = {
        Bucket: process.env.BUCKET,
        Key: 'optimizely-datafile.json', // modify with your own key for s3
        Body: JSON.stringify(datafile),
        ContentType: "application/json"
      }

      // uploads to s3
      s3.upload(params, (err, data) => {
        if(err){
          console.log('there was an error ', err);
        }
        return console.log('Finished running lambda');
      });
    })
    .catch(function (err) {
      console.log('ERROR ', err);
    });
}