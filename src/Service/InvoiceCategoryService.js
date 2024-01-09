const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash");
const InvoiceCategoryModel = require("../Model/InvoiceCategoryModel");

module.exports = {
  Create: async (req, res, next) => {
    const InvoiceCategory = new InvoiceCategoryModel({
      _id: new mongoose.Types.ObjectId(),
      category: req.body.category,
      user: req.payload.aud,
    });

    result = await InvoiceCategory.save();
    return result;
  },

  Update: async (req, res, next) => {
    const result = await InvoiceCategoryModel.updateOne(
      {
        _id: req.params.category_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
      },
      { $set: { category: req.body.category } }
    );
    return result;
  },

  Show: async (req, res, next) => {
    const result = await InvoiceCategoryModel.findOne({
      _id: req.params.category_id,
      user: mongoose.Types.ObjectId(req.payload.aud),
    });
    return result;
  },
  Delete: async (req, res, next) => {
    const result = await InvoiceCategoryModel.deleteOne({
      _id: req.params.category_id,
      user: mongoose.Types.ObjectId(req.payload.aud),
    });
    return result;
  },

  Index: async (req, res, next) => {
    const result = await InvoiceCategoryModel.find({
      user: mongoose.Types.ObjectId(req.payload.aud),
    }).sort({"created_at":-1});
    return result;
  },
};
