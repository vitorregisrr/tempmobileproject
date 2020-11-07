const express = require('express');
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  mongoDBSession = require('connect-mongodb-session')(session),
  path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Setando middlewares utilitários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// Libera acesso universal para a API
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  next();
});

// Hello (para teste)
app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Servidor conectado!'
  });
});

// Rotas
const apiRoutes = require('./server/routes/api');
app.use(apiRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Importa a URI do mongo de forma segura
const MONGO_URI = require('./server/util/mongo_URI');

//Coneca com o cluster do mongodb e inicia o servidor
const connection = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
  })
  .then((resul) => {})
  .then(resul => {
    app.listen(port);
  })
  .catch(err => console.log(err));

module.exports = connection;