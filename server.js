var evironment = process.env.NODE_ENV || 'development',
    application = require('./server/app/application');

var isProduction = (process.env.NODE_ENV === 'production');
var port = (isProduction ? 80 : 8000);

application.listen(port);
