var evironment = process.env.NODE_ENV || 'development',
    application = require('./server/src/application');


// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('awwWL_rW1RBpk3Ii');

application.listen(8000);
