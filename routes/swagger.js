
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
  
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports = router;
