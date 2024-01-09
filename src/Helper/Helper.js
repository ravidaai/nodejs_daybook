const mongoose = require("mongoose");
const UserModel = require("../Model/UserModel");
const CompanyModel = require("../Model/CompanyModel");
const InvoiceCategoryModel = require("../Model/InvoiceCategoryModel");
const InvoiceModel = require("../Model/InvoiceModel");
const createError = require("http-errors");
const { perPage } = require("../config/index");
class dbHelper {
  constructor(...args) {
    this.args = args;
    this.request = this.args[0];
  }

  isValidId() {
    if (!this.request._id) throw createError.NotAcceptable();
    return mongoose.Types.ObjectId.isValid(this.request._id);
  }

  //return true / false
  async isUserEmailExist() {
    if (!this.request.email) throw createError.NotAcceptable();
    const emailExist = await UserModel.exists({ email: this.request.email });
    return emailExist;
  }

  //return true / false
  async isUserExist() {
    if (!this.request.aud) throw createError.NotAcceptable();
    const userExist = await UserModel.exists({ _id: this.request.aud });
    return userExist;
  }

  async getUserIfExist() {
    if (!this.request.email) throw createError.NotAcceptable();
    const user = await UserModel.findOne({ email: this.request.email });
    return user;
  }

  async isUserCompanyExist() {
    if (!this.request.company_name) throw createError.NotAcceptable();
    const companyExist = await CompanyModel.exists({
      company_name: this.request.company_name,
      user: this.request.aud,
    });
    return companyExist;
  }

  async isCompanyExistWhere() {
    if (!this.request) throw createError.NotAcceptable();
    const companyExist = await CompanyModel.exists(this.request);
    console.log(companyExist);
    return companyExist;
  }

  async isCategoryExistWhere() {
    if (!this.request) throw createError.NotAcceptable();
    const categoryExist = await InvoiceCategoryModel.exists(this.request);
    console.log(categoryExist);
    return categoryExist;
  }

  async isInvoiceExistWhere() {
    if (!this.request) throw createError.NotAcceptable();
    const invoiceExist = await InvoiceModel.exists(this.request);
    console.log(invoiceExist);
    return invoiceExist;
  }
}

class ResponseHelper {
  constructor() {}
  Success(msg, data) {
    if (data) return { msg: msg, data: data };
    return { msg: msg };
  }
}

class PaginationHelper {
  constructor() {}


  async create(model, payload) {
    //?page=1&limit=2
    const page = parseInt(payload.page)?parseInt(payload.page):1;
    const limit = parseInt(payload.limit)?parseInt(payload.limit):parseInt(perPage);
    

    // console.log("page",page)
    // console.log("limit",limit)
    //console.log("perpage",perPage)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments(payload.q ?? null).exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model
      .find(payload.q ?? null)
      .skip(startIndex)
      .limit(limit)
      .exec();
    return results;
  }
}

// module.exports.dbHelper = dbHelper;
// module.exports.ResponseHelper = ResponseHelper;

//OR
module.exports = { dbHelper, ResponseHelper, PaginationHelper };

//module.exports = dbHelper;

//  const helper = new dbHelper({_id:123, name:"ravi", lname:"kazi"});
//  helper.isValidId();

// function getNextSequenceValue(model, sequenceName){
//     var sequenceDocument = model.findAndModify({
//        query:{invoide_id: sequenceName },
//        update: {$inc:{sequence_value:100}},
//        new:true
//     });
//     return sequenceDocument.sequence_value;
//  }

//  module.exports.getNextSequenceValue = getNextSequenceValue;
