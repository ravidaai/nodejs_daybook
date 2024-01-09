const express = require('express');
const router = express.Router();
const companyController = require('../Controller/CompanyController');
//const verifyToken = require('../Middleware/verifyToken');
const {verifyAccessToken} = require('../Helper/jwtHelper');
const Request = require('../Middleware/Request/CompanyRequest');

/**
 * GET request to /company
 */
router.get('/', [verifyAccessToken, Request.index],  companyController.index);

/**
 * GET request to /dropdown
 */
 router.get('/dropdown', [verifyAccessToken],  companyController.dropdown);

/**
 * GET request to /company/:id
 */
router.get('/:company_id', [verifyAccessToken, Request.show], companyController.show);

/**
 * POST request to /company
 */
router.post("/", [verifyAccessToken, Request.create], companyController.create);

/**
 * Delete request to /company/:id
 */
 router.delete('/:company_id', [verifyAccessToken, Request.delete], companyController.delete);

/**
 * Update request to /company/:id
 */
 router.patch('/:company_id', [verifyAccessToken, Request.update], companyController.update);
  

module.exports = router;