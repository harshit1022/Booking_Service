const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_SYNC: process.env.DB_SYNC,
  GET_FLIGHT_PATH: process.env.GET_FLIGHT_PATH, 
  EXCHANGE_NAME: process.env.EXCHANGE_NAME, 
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY, 
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL, 
}