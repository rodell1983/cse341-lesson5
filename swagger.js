const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Rocket Database',
    description: "Rocket Api <br><a href='/auth'>Authorize User</a> "
  },
  host: 'cse341-lesson8.onrender.com',
  schemes: ['https', 'http'],
  components: {
    securitySchemes: {
      oauth: {
        type: 'oauth2',
        flows: [
          {
            implicit: {
              authorizationUrl: 'https://github.com/login/oauth/authorize',
              scopes: {
                'read:vehicle': 'read vehicle data',
                'write:vehicle': 'write vehicle data',
                'read:mission': 'read mission data',
                'write:mission': 'write mission data',
                admin: 'Do it all'
              }
            }
          }
        ]
      }
    }
  },

  definitions: {
    vehicle: {
      $name: 'Atlas',
      $stages: 2,
      $thrust: 1000000.0
    },
    mission: {
      $name: 'apollo11',
      $launchSite: 'Cape Canaveral',
      $vehicle: 'Saturn V',
      duration: '195h 18m 35s',
      crew: '["Neil Armstrong", "Buzz Aldren", "Michael Collins"]',
      apogee: 240000.0,
      $destination: 'moon'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
