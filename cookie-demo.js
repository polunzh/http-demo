const assert = require('assert');
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const PORT = 5002;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('user', 'zhangzhenqiang', {
    sameSite: 'None',
    expires: new Date('2020-03-01 16:48:45'),
  });

  res.cookie('name', 'zhenqiang', {
    sameSite: 'Strict',
  });

  res.cookie('gender', 'male', {
    sameSite: 'Lax',
  });

  const page = fs.readFileSync('./index.html').toString();
  res.set('Content-Type', 'text/html');
  res.send(page);
});

app.get('/dog', (req, res) => {
  res.cookie('animal', 'dog', {
    path: '/dog',
  });

  const page = fs.readFileSync('./index.html').toString();
  res.set('Content-Type', 'text/html');
  res.send(page);
});

app.listen(PORT, err => {
  assert.equal(err, null);
  console.log(`Example app listening on port ${PORT}`);
});
