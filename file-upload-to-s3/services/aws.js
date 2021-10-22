/* global Config */

const AWS = require('aws-sdk');

// AWS.config.update({ region: process.env.REGIN, accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY, signatureVersion: 'v4' });

AWS.config.update({ region: process.env.REGIN });

const s3params = { region: process.env.REGIN, accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY, signatureVersion: 'v4' };

class AWSServices {
  static generateS3SignedUrl(bucketName, filePath) {
    try {
      const s3 = new AWS.S3(s3params);
      const newUrl = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: filePath,
        Expires: 600
      });

      return newUrl;
    } catch (err) {
      throw err;
    }
  }

  static getListOfObjects(bucketName) {
    try {

      return new Promise((resolve,reject)=>{
        const s3 = new AWS.S3(s3params);
        s3.listObjects({ Bucket: bucketName }, function(err, data) {
          if (!err) {
            console.log('??????????????????????', data);
            resolve(data);
          } else reject(err);
        });
      });
    } catch (err) {
      // throw err;
      console.log(err);
    }
  }
}

module.exports = AWSServices;
