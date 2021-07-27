const express = require('express');
const router = express.Router();
const invoiceController = require('../Controller/InvoiceController');
// const verifyToken = require('../Middleware/verifyToken');
const {verifyAccessToken} = require('../Helper/jwtHelper');
const Request = require('../Middleware/Request/InvoiceRequest');
/**
 * GET request to /invoice
 */
router.get('/', [verifyAccessToken, Request.index],  invoiceController.index);

/**
 * GET request to /invoice/:id
 */
router.get('/:invoice_id', [verifyAccessToken, Request.show], invoiceController.show);

/**
 * POST request to /invoice
 */
router.post("/", [verifyAccessToken, Request.create], invoiceController.create);

/**
 * Delete request to /invoice/:id
 */
 router.delete('/:invoice_id', [verifyAccessToken, Request.delete], invoiceController.delete);

/**
 * Update request to /invoice/:id
 */
 router.patch('/:invoice_id', [verifyAccessToken, Request.update], invoiceController.update);
  

module.exports = router;