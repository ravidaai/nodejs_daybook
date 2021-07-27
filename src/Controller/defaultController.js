const IsError = require("../Helper/IsErrorHelper");

const defaultController = async (req, res, next) => {
res.status(200).json(IsError(false, "Home Page", "Welcometo PettyCash"));
};

module.exports = defaultController;