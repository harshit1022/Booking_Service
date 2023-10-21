const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const bookingService = new BookingService();

const create = async (req, res) => {
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

const update = async (req, res) => {
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

const cancel = async (req, res) => {
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

module.exports = {
  create,
  update,
  cancel
}