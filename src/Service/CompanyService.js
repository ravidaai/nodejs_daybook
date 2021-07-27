const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;
const _ = require("lodash");
const CompanyModel = require("../Model/CompanyModel");
module.exports = {
  Create: async (req, res, next) => {
    const Company = new CompanyModel({
      _id: new mongoose.Types.ObjectId(),
      company_name: req.body.company_name,
      user:req.payload.aud 
    });
    result = await Company.save();
    return result
  },

  Update: async (req, res, next) => {
    const Company = await CompanyModel.updateOne({ _id: req.params.company_id, user:  mongoose.Types.ObjectId(req.payload.aud) }, {$set:{company_name: req.body.company_name}});
    return Company;
  },

  Show: async (req, res, next) => {
    const Company =  await CompanyModel.findOne({ _id: req.params.company_id, user:  mongoose.Types.ObjectId(req.payload.aud) });
    return Company;
  },
  Delete: async (req, res, next) => {
    const Company = await CompanyModel.deleteOne({ _id: req.params.company_id, user:  mongoose.Types.ObjectId(req.payload.aud) });
    return Company;
  },

  Index: async (req, res, next) => {
    const Company = await CompanyModel.find({user:  mongoose.Types.ObjectId(req.payload.aud)});
    return Company;
  },
};
