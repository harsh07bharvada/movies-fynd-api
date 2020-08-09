const cors = require('cors');
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const openRouter = require('./routes/openRoutes');
const secureRouter = require('./routes/secureRoutes');
const connectToMongoDBAtlas = require('./database/connection');

const app = express();

app.use(cors());

app.use(express.json({
  extended: false
}));

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));

app.use(cookieParser());

connectToMongoDBAtlas().catch(error => {
  console.log(`Error on mongo connection! - ${error.stack}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.use('/', openRouter);
app.use('/secure/', secureRouter);

app.listen(port, console.log('Server up and running!'));