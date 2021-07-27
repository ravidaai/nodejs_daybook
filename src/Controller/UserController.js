const UserService = require("../Service/UserService");
const createError = require("http-errors");
const {ResponseHelper} = require("../Helper/Helper");
const Message = new ResponseHelper();
module.exports = {
  create: async (req, res, next) => {
    try {
      const result = await UserService.Create(req, res);
      res.status(200).json(Message.Success("User", result));
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const access_token = await UserService.Login(req, res);
      res.status(200).json(IsError(false, `Token`, access_token));
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const result = await UserService.ChangePassword(req, res);
      res.status(200).json(Message.Success("Password Changed"));
    } catch (error) {
      next(error);
    }
  },

  refresh_token: async (req, res, next) => {
    try {
      const result = await UserService.RefreshToken(req, res);
      res.status(200).json(Message.Success("Refresh Token", result));
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const result = await UserService.Logout(req, res, next);
      res.status(204).json(Message.Success("Successfully logout"));
    } catch (error) {
      next(error);
    }
  },
};
