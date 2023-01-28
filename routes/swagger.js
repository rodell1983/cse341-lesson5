const express = require('express');
//const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

//app.use(
//    '/api-docs',
//    swaggerUi.serve,
//    swaggerUi.setup(swaggerDocument)
//  );

var options = {
  oauth: {
    clientId: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_SECRET}`,
    appName: 'Rockets',
  }
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, false, options));

module.exports = router;
