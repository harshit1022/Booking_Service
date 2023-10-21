const axios = require('axios');
const {GET_FLIGHT_PATH} = require('../config/serverConfig')

const { BookingRepository } = require('../repository/index');
const { ServiceError } = require('../utils/index');

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const id = data.flightId;
      const getFlightRequestURL = `${GET_FLIGHT_PATH}/api/v1/flights/${id}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      // console.log("FLIGHT_DATA => ", flightData);
      // console.log("NO OF SEATS => ", data.noOfSeats);
      let priceOfFlight = flightData.price;
      if(data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          'Something went wrong in booking process',
          'Required number of seats are not available'
        );
      }
      const totalCost = (data.noOfSeats)*(priceOfFlight);
      const bookingPayload = {... data, totalCost};
      // console.log("Booking Payload => ", bookingPayload);
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${GET_FLIGHT_PATH}/api/v1/flights/${booking.flightId}`;
      // console.log("Update Flight Request URL  => ", updateFlightRequestURL);
      await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
      const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});
      return finalBooking;
    } 
    catch (error) {
      if(error.name == 'ValidationError' || error.name == 'RepositoryError') {
        throw error;
      }
      //console.log(error);
      throw new ServiceError();
    }
  }

  async updateBooking (bookingId, data) {
    try {
      const booking = await this.bookingRepository.update(bookingId, data);
      return booking;
    } 
    catch (error) {
      throw new ServiceError();
    }
  }

  async cancelBooking (bookingId) {
    try {
      const final = await this.bookingRepository.update(bookingId, {status: "Cancelled"});

      const booking = await this.getBooking(bookingId);      
      const flightId = booking.flightId; // got the flightId

      const getFlightRequestURL = `${GET_FLIGHT_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data; // got the flightData
      
      const updateFlightRequestURL = `${GET_FLIGHT_PATH}/api/v1/flights/${flightId}`;
      await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats + booking.noOfSeats});

      return final;
    } 
    catch (error) {
      throw new ServiceError();
    }
  }

  async getBooking (bookingId) {
    try {
      const booking = await this.bookingRepository.get(bookingId);
      return booking;
    } 
    catch (error) {
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
