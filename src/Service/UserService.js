const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("../Model/UserModel");
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require("../Helper/jwtHelper");
const redisClient = require('../Helper/init_redis')
const createError = require('http-errors');


module.exports = {
  Create: async (req, res, next) => {
    const {name, email, password} = req.body;
      const User = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        password: password,
      });

      const result = await User.save();
      const access_token = await signAccessToken(result._id);
      const refresh_token = await signRefreshToken(result._id);
      return {access_token, refresh_token};
  },

  Login: async (req, res) => {
    //https://www.npmjs.com/package/jsonwebtoken
    const user = await UserModel.findOne({ email: req.body.email });
    const access_token = await signAccessToken(user._id);
    const refresh_token = await signRefreshToken(user._id);
    //res.header("auth-token", access_token);
    return {access_token, refresh_token};
  },
 
  RefreshToken: async (req, res, next) => {
    const { refreshToken } = req.body
    
    if (!refreshToken) throw createError.BadRequest()
    const userId = await verifyRefreshToken(refreshToken)
    const access_token = await signAccessToken(userId)
    const refresh_token = await signRefreshToken(userId)
    return {access_token, refresh_token}
  },

  Logout: async (req, res, next) => {
    //Note: delete access_token and refresh_token from client side as well
    const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      redisClient.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        return
      })
  },

  ChangePassword: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(req.body.new_password, salt);
      const result = await UserModel.updateOne(
        { _id: req.payload.aud },
        { $set: { password: hashedpassword } }
      );
      return result;
  },
};
