const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    lowercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"userModel"
  },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("CompanyModel", companySchema);
