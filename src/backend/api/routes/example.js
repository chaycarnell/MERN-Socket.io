const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/example');

router.get('/test', exampleController.test);

module.exports = router;
