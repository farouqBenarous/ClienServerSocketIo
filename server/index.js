const winston = require('winston');
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');

// mongodb+srv://farouk:5hrvlvrurk45@cluster0-pmw9r.mongodb.net/test?retryWrites=true&w=majority

//require('./startup/logging')();

app.use(cors())
app.use(cookieParser());
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
//require('./startup/prod')(app) ;

const port = 5050  || process.env.Port  ;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
