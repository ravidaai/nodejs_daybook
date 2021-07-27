const jwt = require("jsonwebtoken");
const UserModel = require('../Model/UserModel');
const createError = require('http-errors');
module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  
  if (!token) throw createError.Unauthorized('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findById(verified.aud);
    console.log(user);
    if (!user) {
        throw createError.Unauthorized('Unauthorized');
    }
    req.auth = verified;
    next();
  } catch(error) {
    next(error);
  }
}
