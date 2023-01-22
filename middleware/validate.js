const validator = require('../helpers/validate');

const saveMission = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    launchSite: 'required|string',
    vehicle: 'required|string',
    duration: 'string',
    crew: 'string',
    apogee: 'numeric',
    destination: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveVehicle = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    stages: 'required|integer',
    thrust: 'required|numeric'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMission,
  saveVehicle
};
