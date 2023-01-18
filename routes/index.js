const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/vehicle', require('./vehicle'));
router.use('/mission', require('./mission'));

module.exports = router;
