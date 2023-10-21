const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_SYNC: process.env.DB_SYNC,
  GET_FLIGHT_PATH: process.env.GET_FLIGHT_PATH
}