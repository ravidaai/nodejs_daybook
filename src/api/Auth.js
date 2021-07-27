const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');
//const verifyToken = require('../Middleware/verifyToken');
const {verifyAccessToken} = require('../Helper/jwtHelper');
const LoginRequest = require('../Middleware/Request/LoginRequest');
const UserRequest = require('../Middleware/Request/UserRequest');
/**
 * POST request to /user
 */
 router.post("/", [UserRequest.create], UserController.create);

/**
 * POST request to /login
 */
 router.post("/login",[LoginRequest.login],  UserController.login);

/**
 * POST request to /refresh-token
 */
 router.post("/refresh_token",  UserController.refresh_token);

/**
 * POST request to /refresh-token
 */
 router.delete("/logout",  UserController.logout);

/**
 * POST request to /change_password
 */
 router.post("/change_password", [verifyAccessToken, UserRequest.changePassword], UserController.changePassword);

module.exports = router;