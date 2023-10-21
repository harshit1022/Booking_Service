const express = require('express');

const { BookingController } = require('../../controllers/index');

const router = express.Router();

router.post('/bookings', BookingController.create);
router.patch('/bookings/:id', BookingController.update);
router.patch('/bookings/cancel/:id', BookingController.cancel);

module.exports = router;