const Joi = require("@hapi/joi");
const {dbHelper} = require("../../Helper/Helper");
const mongoose = require("mongoose");
module.exports = {
  create: async (req, res, next) => {
    try {
      const schema = Joi.object({
        category: Joi.string().min(6).max(100).required(),
      });
      const result = await schema.validateAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const schema = Joi.object({
        category: Joi.string().min(6).max(100).required(),
      });

      const result = await schema.validateAsync(req.body);

      //check if category assigned to loggedin user
      const helper  = new dbHelper({
        _id: req.params.category_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
      });
     if(!await helper.isCategoryExistWhere()) throw createError.NotFound(`Category not found.`);

      next();
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try{
      const helper  = new dbHelper({
        _id: req.params.category_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
      });

      if(!await helper.isCategoryExistWhere()) throw createError.NotFound(`Category not found.`);
    }catch(error){
        next(error);
    }
  },
  show: async (req, res, next) => {
    try{
      const helper  = new dbHelper({
        _id: req.params.category_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
      });

      if(!await helper.isCategoryExistWhere()) throw createError.NotFound(`Category not found.`);
    }catch(error){
        next(error);
    }
  },
  index: async (req, res, next) => {
    next();
  },
};
