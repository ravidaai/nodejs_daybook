const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash");
const InvoiceCategoryModel = require("../Model/InvoiceCategoryModel");

module.exports = {
  Create: async (req, res) => {
    const InvoiceCategory = new InvoiceCategoryModel({
      _id: new mongoose.Types.ObjectId(),
      category: req.body.category,
      user: req.auth._id,
    });

    result = await InvoiceCategory.save();
    return result;
  },

  Update: async (req, res) => {
    const result = await InvoiceCategoryModel.updateOne(
      {
        _id: req.params.category_id,
        user: mongoose.Types.ObjectId(req.auth._id),
      },
      { $set: { category: req.body.category } }
    );
    return result;
  },

  Show: async (req, res) => {
    const result = await InvoiceCategoryModel.findOne({
      _id: req.params.category_id,
      user: mongoose.Types.ObjectId(req.auth._id),
    });
    return result;
  },
  Delete: async (req, res) => {
    const result = await InvoiceCategoryModel.deleteOne({
      _id: req.params.category_id,
      user: mongoose.Types.ObjectId(req.auth._id),
    });
    return result;
  },

  Index: async (req, res) => {
    const result = await InvoiceCategoryModel.find({
      user: mongoose.Types.ObjectId(req.auth._id),
    });
    return result;
  },
};
