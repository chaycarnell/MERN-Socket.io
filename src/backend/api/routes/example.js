const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/example');

router.get('/example', exampleController.test);

module.exports = router;
