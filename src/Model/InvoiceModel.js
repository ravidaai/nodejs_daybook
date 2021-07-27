const { number } = require("joi");
const mongoose = require("mongoose");
const invoiceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  invoice_date: {
    type: String,
    required: true,
  },
  invoice_number: {
    type: String,
  },
  receipt_number: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  particular: {
    type: String,
    required: true,
  },
  cash_in: {
    type: Number,
    required: true,
  },
  cash_out: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "companyModel",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "invoiceCategoryModel",
  },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("InvoiceModel", invoiceSchema);
