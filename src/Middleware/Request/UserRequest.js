const Joi = require("@hapi/joi");
const createError = require("http-errors");
const {dbHelper} = require("../../Helper/Helper");

module.exports = {
  create: async (req, res, next) => {
    try {
      
      const schema = Joi.object({
        name: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(50).required().lowercase().email(),
        password: Joi.string().min(2).max(255).required(),
      });

      const result = await schema.validateAsync(req.body);
     
      //check if email already exist
      const helper  = new dbHelper({email:result.email});
      if(await helper.isUserEmailExist()) throw createError.Conflict(`${result.email} is already been used.`);

      next();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const schema = Joi.object({
        new_password: Joi.string().min(6).max(255).required(),
        confirm_password: Joi.string()
          .min(6)
          .max(255)
          .required()
          .valid(Joi.ref("new_password")),
      });

      const result = await schema.validateAsync(req.body);
      const helper  = new dbHelper({aud:req.payload.aud});
      if(!await helper.isUserExist()) throw createError.Unauthorized();

      next();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  update: async (req, res, next) => {
    next();
  },
  delete: async (req, res, next) => {
    next();
  },
  show: async (req, res, next) => {
    next();
  },
  index: async (req, res, next) => {
    next();
  },
};
