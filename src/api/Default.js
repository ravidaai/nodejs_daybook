const express = require('express');
const router = express.Router();
const defaultController = require('../Controller/defaultController');

/**
 * GET request to /company
 */
 router.get("/", defaultController);

 module.exports = router;