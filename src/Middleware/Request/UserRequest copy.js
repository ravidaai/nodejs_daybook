const Joi = require("@hapi/joi");

const IsError = require("../../Helper/IsErrorHelper");
const UserModel = require("../../Model/UserModel");
const createError = require("http-errors");

module.exports = {
  create: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(50).required().lowercase().email(),
        password: Joi.string().min(2).max(255).required(),
      });

      // const { name, email, password } = req.body;
      // const payload = {
      //   name: name,
      //   email: email,
      //   password: password,
      // };

      // const { error } = await schema.validateAsync(payload);
      // if (error) {
      //   throw createError.BadRequest(error.message);
      //   //return res.status(406).json(IsError(true, `${error.message}`));
      // }

      const result = await schema.validateAsync(req.body);
      
      if (await UserModel.exists({ email: result.email })) {
        //return res.status(406).json(IsError(true, `User already exists.`));
        throw createError.Conflict(`${result.email} is already been used.`);
      }

      next();
    } catch (error) {
      if(error.isJoi === true) error.status = 422
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    const schema = Joi.object({
      new_password: Joi.string().min(6).max(255).required(),
      confirm_password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .valid(Joi.ref("new_password")),
    });

    const payload = {
      new_password: req.body.new_password,
      confirm_password: req.body.confirm_password,
    };

    const { error } = schema.validate(payload);
    if (error) {
      return res.status(406).json(IsError(true, `${error.message}`));
    }

    if (!(await UserModel.findOne({ _id: req.auth._id }))) {
      return res.status(406).json(IsError(true, `Permission denied`));
    }
    next();
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
