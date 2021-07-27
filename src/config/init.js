const mongoose = require("mongoose");
const { mongoUrl, databaseName, environment } = require("./index");

module.exports = {
  initializeDB: async () => {
    mongoose
      .connect(mongoUrl, {
        dbName: databaseName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log(`Connected to the Database. ${mongoUrl}`);
      })
      .catch((err) => console.log(err.message));

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to db");
    });

    mongoose.connection.on("error", (err) => {
      console.log(err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection is disconnected.");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    mongoose.Promise = global.Promise;
  },

  cors: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  },
};
