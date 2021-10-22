module.exports = {
  AWS_CONFIG: { apiVersion: '2012-10-17', region: 'ap-south-1', signatureVersion: 'v4' },

  S3_BUCKETS: {
    MEDIA_BUCKET_NAME: process.env.S3_MEDIA_BUCKET,
  },
};
