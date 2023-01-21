const express = require('express');
const router = express.Router();

const missionsController = require('../controllers/mission');
const validation = require('../middleware/validate');

router.get('/', missionsController.getAll);

router.get('/:id', missionsController.getSingle);

router.post('/', validation.saveMission, missionsController.createMission);

router.put('/:id', validation.saveMission, missionsController.updateMission);

router.delete('/:id', missionsController.deleteMission);

module.exports = router;
