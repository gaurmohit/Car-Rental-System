const env = process.env.NODE_ENV || 'dev';

const config = require('./config/config')[env];
require('./config/database')(config);
const app = require('express')();
require('./config/express')(app);
require('./router/routers')(app);
require('./config/passport')();
app.listen(config.port);