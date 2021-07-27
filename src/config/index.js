const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  environment:process.env.ENVIRONMENT,
  mongoUrl:process.env.MONGO_URL,
  databaseName:process.env.DB_NAME,
  redisHost:process.env.REDIS_HOST,
  redisPort:process.env.REDIS_PORT,
  
};