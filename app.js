const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const session = require('express-session');

let app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

// session
app.set('trust proxy', 1);
app.use(session({
  secret: 'farmer',
  resave: false,
  saveUnitialized: true
}));

// root
const rootRoutes = require('./routes');
app.use('/', rootRoutes);

// farmers
const farmersRoutes = require('./routes/farmers');
app.use('/farmers', farmersRoutes);

// crops
const cropsRoutes = require('./routes/crops');
app.use('/crops', cropsRoutes);

app.listen(3000, console.log('Listening on port 3000'));
