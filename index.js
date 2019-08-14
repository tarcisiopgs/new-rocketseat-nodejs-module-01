const express = require('express'),
  server = express(),
  users = [];

server.use(express.json());
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url};`);

  return next();
});

function checkNameExists(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  return next();
}

function checkuserInArray(req, res, next) {
  const { index } = req.params;
  if (!users[index]) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkuserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post('/users', checkNameExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkNameExists, checkuserInArray, (req, res) => {
  const { index } = req.params,
    { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkuserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
