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

// helper
app.locals.getDate = require('./helpers/date');

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Listening on port ${port}`));
