const InvoiceCategoryService = require("../Service/InvoiceCategoryService");
const {ResponseHelper} = require("../Helper/Helper");
const Message = new ResponseHelper();
module.exports = {
  delete: async (req, res, next) => {
    try {

      const result = await InvoiceCategoryService.Delete(req, res, next);
      res.status(200).json(Message.Success(`Category successfully deleted.`, result));
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await InvoiceCategoryService.Update(req, res, next);
      res.status(200).json(Message.Success(`Category successfully updated.`, result));
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const result = await InvoiceCategoryService.Create(req, res, next);
        res.status(200).json(Message.Success(`Category successfully created.`, result));
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const result = await InvoiceCategoryService.Show(req, res, next);
      res.status(200).json(Message.Success(`Category details.`, result));
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const result = await InvoiceCategoryService.Index(req, res, next);
      res.status(200).json(Message.Success(`category list.`, result));
    } catch (error) {
      //console.log(error)
      next(error);
    }
  },
};
