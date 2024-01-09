const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash");
const CompanyModel = require("../Model/CompanyModel");
const { PaginationHelper } = require("../Helper/Helper");
module.exports = {
  Create: async (req, res, next) => {
    const Company = new CompanyModel({
      _id: new mongoose.Types.ObjectId(),
      company_name: req.body.company_name,
      user: req.payload.aud,
    });
    result = await Company.save();
    return result;
  },

  Update: async (req, res, next) => {
    const Company = await CompanyModel.updateOne(
      {
        _id: req.params.company_id,
        user: mongoose.Types.ObjectId(req.payload.aud),
      },
      { $set: { company_name: req.body.company_name } }
    );
    return Company;
  },

  Show: async (req, res, next) => {
    const Company = await CompanyModel.findOne({
      _id: req.params.company_id,
      user: mongoose.Types.ObjectId(req.payload.aud),
    });
    return Company;
  },
  Delete: async (req, res, next) => {
    const Company = await CompanyModel.deleteOne({
      _id: req.params.company_id,
      user: mongoose.Types.ObjectId(req.payload.aud),
    });
    return Company;
  },

  Index: async (req, res, next) => {
    // const limit = parseInt(req.query.limit);
    // const skip = parseInt(req.query.skip); // Make sure to parse the skip to number
    // const paginate = new PaginationHelper();
    // const Company = await CompanyModel.find({
    //   user: mongoose.Types.ObjectId(req.payload.aud),
    // })
    //   //.sort({ created_at: -1 })
    //   .sort({ _id: -1 })
    //   .skip(skip) // Always apply 'skip' before 'limit'
    //   .limit(limit); // This is your 'page size'

    // return Company;

    //OR

    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // const results = {};

    // if (endIndex < (await CompanyModel.countDocuments({user: mongoose.Types.ObjectId(req.payload.aud)}).exec())) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }

    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }

    // results.results = await CompanyModel.find({user: mongoose.Types.ObjectId(req.payload.aud)})
    //     .skip(startIndex)
    //     .limit(limit)
    //     .exec();
    //   return results;

    //OR

    const Pagination = new PaginationHelper();
    return Pagination.create(CompanyModel, {
      q: { user: mongoose.Types.ObjectId(req.payload.aud) },
      page: req.query.page,
      limit: req.query.limit,
    });
  },
  dropdown: async (req, res, next) => {
    
    const result = await CompanyModel.find({
      user: mongoose.Types.ObjectId(req.payload.aud),
    }).sort({"created_at":-1});
    return result;
  },
};
