const cors = require('cors');
const path = require('path');
const express = require('express');
const port = process.env.PORT || 5000;
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

app.use(express.static('client/build'));

app.use('/', openRouter);
app.use('/secure/', secureRouter);

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, console.log('Server up and running!'));