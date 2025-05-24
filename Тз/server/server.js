const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const subscriptions = [];

webpush.setVapidDetails(
  'mailto:you@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Сохраняем подписку
app.post('/subscribe', (req, res) => {
  const sub = req.body;
  subscriptions.push(sub);
  res.status(201).json({});
});

// Пример отправки уведомлений (вызывается при землетрясении)
function notifyAllNearbyUsers(eventData) {
  const payload = JSON.stringify({
    body: `${eventData.place}, M${eventData.mag}, ${eventData.distance} км`
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => console.error('Ошибка:', err));
  });
}

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));