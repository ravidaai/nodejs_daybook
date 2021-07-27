const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const createError = require('http-errors');
const config = require("./config/init");
require("./Helper/init_redis");
const app = express();
app.use(morgan('dev'));


//connect to DB
config.initializeDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //incase of form data

app.use(config.cors);

//routes
const companyRoutes = require("./api/Company");
const invoiceRoutes = require("./api/Invoice");
const defaultRoutes = require("./api/Default");
const invoiceCategoryRoutes = require("./api/InvoiceCategory");
const authRoutes = require("./api/Auth");

app.use("/", defaultRoutes);
app.use("/company", companyRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/category", invoiceCategoryRoutes);
app.use("/auth", authRoutes);

//if no route found
app.use(async(req, res, next)=>{
    next(createError.NotFound('This route does not exist.'));
})
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

module.exports = app;
