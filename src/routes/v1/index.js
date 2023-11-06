const express = require('express');

const { BookingController } = require('../../controllers/index');
// const { createChannel } = require('../../utils/messageQueue');

// const channel = await createChannel();
const bookingController = new BookingController();
const router = express.Router();

router.post('/bookings', bookingController.create);
router.patch('/bookings/:id', bookingController.update);
router.patch('/bookings/cancel/:id', bookingController.cancel);
router.get('/bookings/:id', bookingController.get);

router.post('/publish', bookingController.sendMsgToQueue);

module.exports = router;