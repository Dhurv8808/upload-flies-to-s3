const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const port = 9000;
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* global AWS:writable */
AWS = require('./services/aws');

/* global Config:writable */
Config = require('./config');


app.get('/getList', async (req, res) => {
  const list = await AWS.getListOfObjects(Config.S3_BUCKETS.MEDIA_BUCKET_NAME);
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', list);

  if (list) res.status(201).send({data: list.Contents});
});

app.get('/', (req, res) => {
  res.status(200).send('Upload s3 server');
});



app.post('/upload', (req, res) => {
  const imagePath = `media/${new Date().getTime()}image`;
  const url = AWS.generateS3SignedUrl(Config.S3_BUCKETS.MEDIA_BUCKET_NAME, imagePath);

  res.status(201).send({url});
});



app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
