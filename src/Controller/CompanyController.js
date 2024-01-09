const CompanyService = require("../Service/CompanyService");
const {ResponseHelper} = require("../Helper/Helper");
const Message = new ResponseHelper();
module.exports = {
  delete: async (req, res, next) => {
    try {
      const result = await CompanyService.Delete(req, res, next);
      res
        .status(200)
        .json(Message.Success("Company deleted successfully.", result));
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await CompanyService.Update(req, res, next);
      res
        .status(200)
        .json(Message.Success("Company updated successfully.", result));
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const result = await CompanyService.Create(req, res, next);
      res
        .status(200)
        .json(Message.Success("Company added successfully.", result));
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const result = await CompanyService.Show(req, res, next);
      res.status(200).json(Message.Success("Company details", result));
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const result = await CompanyService.Index(req, res, next);
      res.status(200).json(Message.Success("Company list", result));
    } catch (error) {
      next(error);
    }
  },
  dropdown: async (req, res, next) => {
    try {
      const result = await CompanyService.dropdown(req, res, next);
      res.status(200).json(Message.Success("Company dropdown", result));
    } catch (error) {
      next(error);
    }
  },
};
