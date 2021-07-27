const express = require('express');
const router = express.Router();
const InvoiceCategoryController = require('../Controller/InvoiceCategoryController');
// const verifyToken = require('../Middleware/verifyToken');
const {verifyAccessToken} = require('../Helper/jwtHelper');
const Request = require('../Middleware/Request/InvoiceCategoryRequest');
/**
 * GET request to /category
 */
router.get('/', [verifyAccessToken, Request.index],  InvoiceCategoryController.index);

/**
 * GET request to /category/:id
 */
router.get('/:category_id', [verifyAccessToken, Request.show], InvoiceCategoryController.show);

/**
 * POST request to /category
 */
router.post("/", [verifyAccessToken, Request.create], InvoiceCategoryController.create);

/**
 * Delete request to /category/:id
 */
 router.delete('/:category_id', [verifyAccessToken, Request.delete], InvoiceCategoryController.delete);

/**
 * Update request to /category/:id
 */
 router.patch('/:category_id', [verifyAccessToken, Request.update], InvoiceCategoryController.update);
  

module.exports = router;