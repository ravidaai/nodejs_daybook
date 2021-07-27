const Joi = require("@hapi/joi");
const IsError = require("../../Helper/IsErrorHelper");
const CompanyModel = require("../../Model/CompanyModel");
const mongoose = require("mongoose");
const { dbHelper } = require("../../Helper/Helper");
const createError = require("http-errors");

module.exports = {
  create: async (req, res, next) => {
    try {
      const schema = Joi.object({
        company_name: Joi.string().min(6).max(100).required(),
      });

      const result = await schema.validateAsync(req.body);

      // check if company already exist
      const helper = new dbHelper({
        aud: req.payload.aud,
        company_name: result.company_name,
      });
      const company = await helper.isUserCompanyExist();
      if (company) throw createError.Conflict(`Company Name Already Used.`);

      next();
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const schema = Joi.object({
        company_name: Joi.string().min(6).max(100).required(),
      });

      const result = await schema.validateAsync(req.body);

      const helper = new dbHelper({ _id: req.params.company_id });
      if (!helper.isValidId()) throw createError.NotFound("Company not found.");

      //if not exist
      if (
        !(await CompanyModel.exists({
          _id: req.params.company_id,
          user: mongoose.Types.ObjectId(req.payload.aud),
        }))
      )
        throw createError.NotFound("Company not found.");

      next();
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const helper = new dbHelper({
        _id: req.params.company_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
      });
      if (!helper.isValidId()) throw createError.NotFound("Company not found.");

      if (!await helper.isCompanyExistWhere())
        throw createError.NotFound("Company not exist.");
      next();
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const helper = new dbHelper({
        _id: req.params.company_id,
        user: req.payload.aud,
      });
      if (!helper.isValidId()) throw createError.NotFound("Company not found.");

      if (!await helper.isCompanyExistWhere()) throw createError.NotFound("Company not exist.");

      next();
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    await next();
  },
};

// const validation = joi.object({
//   userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
//   email: joi.string().email().trim(true).required(),
//   password: joi.string().min(8).trim(true).required(),
//   mobileNumber: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
//   birthYear: joi.number().integer().min(1920).max(2000),
//   skillSet: joi.array().items(joi.string().alphanum().trim(true))
// .default([]),
//  is_active: joi.boolean().default(true),
// });
