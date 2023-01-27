const express = require('express');
const swaggerAutogen = require('swagger-autogen');
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
    clientId: "2682984117af4ece9a85",
    clientSecret: "cf7d0f3876b36236c97259a61e82057b13f31db9",
    realm: "your-realms",
    appName: "your-app-name",
    scopeSeparator: " ",
    scopes: "openid profile",
    additionalQueryStringParams: {test: "hello"},
    useBasicAuthenticationWithAccessCodeGrant: true,
    usePkceWithAuthorizationCodeGrant: true
  };
  


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument,options));


module.exports = router;
