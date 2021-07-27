const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { dbHelper } = require("../../Helper/Helper");
const InvoiceModel = require("../../Model/InvoiceModel");
const CompanyModel = require("../../Model/CompanyModel");
const InvoiceCategoryModel = require("../../Model/InvoiceCategoryModel");

module.exports = {
  create: async (req, res, next) => {
    try {
      const schema = Joi.object({
        invoice_date: Joi.date().required(),
        invoice_number: Joi.string().required(),
        receipt_number: Joi.string().required(),
        customer_name: Joi.string().min(3).max(255).required(),
        particular: Joi.string().min(3).max(255).required(),
        cash_in: Joi.required(),
        cash_out: Joi.required(),
        company_id: Joi.string().required(),
        category_id: Joi.string().required(),
      });

      const result = await schema.validateAsync(req.body);

      // check if already exist
      if (
        !(await CompanyModel.exists({
          user: mongoose.Types.ObjectId(req.payload.aud),
          _id: mongoose.Types.ObjectId(result.company_id),
        })) ||
        !(await InvoiceCategoryModel.exists({
          _id: mongoose.Types.ObjectId(result.category_id),
          user: mongoose.Types.ObjectId(req.payload.aud),
          company: mongoose.Types.ObjectId(result.company_id),
        }))
      ) {
        throw createError.NotFound(`Company/Category not exist.`);
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const schema = Joi.object({
        invoice_date: Joi.date().required(),
        receipt_number: Joi.string().required(),
        customer_name: Joi.string().min(3).max(255).required(),
        particular: Joi.string().min(3).max(255).required(),
        cash_in: Joi.required(),
        cash_out: Joi.required(),
        company_id: Joi.string().required(),
        category_id: Joi.string().required(),
      });

      const result = await schema.validateAsync(req.body);

      // check if already exist
      if (
        !(await InvoiceModel.exists({
          _id: req.params.invoice_id,
          user: mongoose.Types.ObjectId(req.payload.aud),
          company: mongoose.Types.ObjectId(result.company_id),
        })) ||
        !(await InvoiceCategoryModel.exists({
          _id: mongoose.Types.ObjectId(result.category_id),
          user: mongoose.Types.ObjectId(req.payload.aud),
        }))
      ) {
        throw createError.NotFound(`Company/Category not exist.`);
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      if (
        !(await InvoiceModel.exists({
          _id: req.params.invoice_id,
          user: mongoose.Types.ObjectId(req.auth._id),
          company: mongoose.Types.ObjectId(req.body.company_id),
        }))
      ) {
        throw createError.NotFound(`Invoice not exist.`);
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      if (
        !(await InvoiceModel.exists({
          _id: req.params.invoice_id,
          user: mongoose.Types.ObjectId(req.auth._id),
          company: mongoose.Types.ObjectId(req.body.company_id),
        }))
      ) {
        throw createError.NotFound(`Invoice not exist.`);
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const schema = Joi.object({
        company_id: Joi.string().required(),
      });

      const result = await schema.validateAsync(req.body);

      if (
        !(await InvoiceModel.exists({
          user: mongoose.Types.ObjectId(req.auth._id),
          company: mongoose.Types.ObjectId(req.body.company_id),
        }))
      ) {
        createError.NotFound(`Invoice list not exist.`);
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};
