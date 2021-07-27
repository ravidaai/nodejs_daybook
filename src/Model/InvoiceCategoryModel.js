const mongoose = require("mongoose");
const invoiceCategoryModelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"userModel"
  },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("invoiceCategoryModel", invoiceCategoryModelSchema);
