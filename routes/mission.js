const express = require('express');
const router = express.Router();

const missionsController = require('../controllers/mission');

router.get('/', missionsController.getAll);

router.get('/:name', missionsController.getSingle);

router.post('/', missionsController.createMission);

module.exports = router;
