const redis = require('redis')
const { redisHost, redisPort} = require('../config/index');
const redisClient = redis.createClient({
  port: redisPort,
  host: redisHost,
})

redisClient.on('connect', () => {
  console.log('Client connected to redis...')
})

redisClient.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
})

redisClient.on('error', (err) => {
  console.log(err.message)
})

redisClient.on('end', () => {
  console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
    redisClient.quit()
})

module.exports = redisClient