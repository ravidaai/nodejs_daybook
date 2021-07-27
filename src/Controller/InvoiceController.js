const InvoiceService = require("../Service/InvoiceService");
const {ResponseHelper} = require("../Helper/Helper");
const Message = new ResponseHelper();
module.exports = {
  delete: async (req, res) => {
    try {
      const result = await InvoiceService.Delete(req, res);
      res.status(200).json(Message.Success(`Invoice successfully deleted.`, result));
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res) => {
    try {
      const result = await InvoiceService.Update(req, res);
      res.status(200).json(Message.Success(`Invoice successfully updated.`, result));
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res) => {
    try {
      const result = await InvoiceService.Create(req, res);
      res.status(200).json(Message.Success(`Invoice successfully created.`, result));
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res) => {
    try {
      
      const result = await InvoiceService.Show(req, res);
      res.status(200).json(Message.Success(`Invoice details.`, result));
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res) => {
    try {
      const result = await InvoiceService.Index(req, res);
      res.status(200).json(Message.Success(`Invoice list.`, result));
    } catch (error) {
      next(error);
    }
  },
};
