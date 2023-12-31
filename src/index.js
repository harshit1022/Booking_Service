const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const startServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // app.get('/bookingService/home', (req, res) => {
  //   return res.status(200).json({
  //     message: 'Booking Service Reached!'
  //   })
  // })
  
  app.use('/bookingService/api', apiRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);

    // if(process.env.DB_SYNC) {
    //   db.sequelize.sync({alter: true});
    // }
  });
}


startServer();