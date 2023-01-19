const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicle');

router.get('/', vehiclesController.getAll);

router.get('/:id', vehiclesController.getSingle);

router.post('/', vehiclesController.createVehicle);

module.exports = router;
