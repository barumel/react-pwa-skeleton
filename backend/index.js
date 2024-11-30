import https from 'https';
import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import lodash from 'lodash';
import webpush from 'web-push';
import cors from 'cors';
import bodyParser from 'body-parser';

const { get } = lodash;

const app = express();
const port = get(process, 'env.PORT', 8080);

const secretsPath = path.join(process.cwd(), 'secrets');
const vapidKeys = fs.readJsonSync(path.join(secretsPath, 'vapidKeys.json'));

const serverKey = fs.readFileSync(path.join(secretsPath, 'server.key'));
const serverCert = fs.readFileSync(path.join(secretsPath, 'server.crt'));

webpush.setVapidDetails(
  'mailto:kim@localhost.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

/// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/vapidPublicKey', (req, res) => {
  res.json({ publicKey: vapidKeys.publicKey });
});

app.post('/subscribe', (req, res) => {
  console.log('SUBSCRIBE', req, res);

  res.status(201);
  res.json({ success: true });
});

app.post('/test-notification', async (req, res) => {
  const { subscription } = req.body;
  const payload = null;

  await webpush.sendNotification(subscription, payload);
  res.status(201);
  res.json({ success: true });
});

const server = https.createServer({ key: serverKey, cert: serverCert }, app).listen(port);

console.log(`Server is listening to ${port}`);
