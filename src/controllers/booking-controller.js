const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const { createChannel, publishMsg } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController {

  constructor() {
  }

  async sendMsgToQueue(req, res) {
    const channel = await createChannel();
    const data = {message: 'Success!!!'}
    publishMsg(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
  }

  async create (req, res)  {
    try {
      const response = await bookingService.createBooking(req.body); 
      return res.status(StatusCodes.OK).json({
        message: 'Successfully completed booking',
        success: true,
        err: {},
        data: response
      });
    } 
    catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {}
      });
    }
  }

  async update (req, res)  {
    try {
      const response = await bookingService.updateBooking(req.params.id, req.body);
      return res.status(StatusCodes.OK).json({
        message: 'Successfully Updated the Booking Details',
        success: true,
        err: {},
        data: response
      })
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {},
        success: false,
        message: 'Error in Update Booking',
        err: error
      })
    }
  }
  
  async cancel (req, res)  {
    try {
      const response = await bookingService.cancelBooking(req.params.id);
      return res.status(StatusCodes.OK).json({
        message: 'Successfully Cancelled the Booking',
        success: true,
        err: {},
        data: response
      })
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {},
        success: false,
        message: 'Error in Cancelling Booking',
        err: error
      })
    }
  }
  
  async get (req, res)  {
    try {
      const response = await bookingService.getBooking(req.params.id);
      return res.status(StatusCodes.OK).json({
        message: 'Successfully fetched the Booking',
        success: true,
        err: {},
        data: response
      })
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {},
        success: false,
        message: 'Error in Fetching the Booking',
        err: error
      })
    }
  }
}

module.exports = BookingController;