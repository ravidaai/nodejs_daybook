const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash");
const InvoiceModel = require("../Model/InvoiceModel");

module.exports = {
  Create: async (req, res) => {
    const invoice = new InvoiceModel({
      _id: new mongoose.Types.ObjectId(),
      invoice_date: req.body.invoice_date,
      invoice_number: req.body.invoice_number,
      receipt_number: req.body.receipt_number,
      customer_name: req.body.customer_name,
      particular: req.body.particular,
      cash_in: req.body.cash_in,
      cash_out: req.body.cash_out,
      company: req.body.company_id,
      category: req.body.category_id,
      user: req.payload.aud,
    });

    result = await invoice.save();
    return result;
  },

  Update: async (req, res) => {
    const result = await InvoiceModel.updateOne(
      {
        _id: req.params.invoice_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
        company: mongoose.Types.ObjectId(req.body.company_id),
      },
      {
        $set: {
          invoice_date: req.body.invoice_date,
          receipt_number: req.body.receipt_number,
          customer_name: req.body.customer_name,
          particular: req.body.particular,
          cash_in: req.body.cash_in,
          cash_out: req.body.cash_out,
          category: req.body.category_id,
        },
      }
    );
    return result;
  },

  Show: async (req, res) => {
    const result = await InvoiceModel.findOne({
      _id: req.params.invoice_id,
      user: mongoose.Types.ObjectId(req.payload.aud),
    });
    return result;
  },
  Delete: async (req, res) => {
    const result = await InvoiceModel.deleteOne({
      _id: req.params.invoice_id,
      user: mongoose.Types.ObjectId(rreq.payload.aud),
      company: mongoose.Types.ObjectId(req.body.company_id),
    });
    return result;
  },

  Index: async (req, res) => {
    const result = await InvoiceModel.find({
      user: mongoose.Types.ObjectId(req.auth._id),
      company: mongoose.Types.ObjectId(req.body.company_id),
    });

    return result;
  },
};
