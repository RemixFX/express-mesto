const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  { useNewUrlParser: true },
  () => console.log('База данных загружена'),
);

app.use((req, res, next) => {
  req.user = { _id: '61e00e50233af95ef8d3cc07' };
  next();
});
app.use('/cards', require('./routes/cards'));

app.use('/users', require('./routes/users'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'ответа с данным url не существует' });
});

app.listen(PORT);
