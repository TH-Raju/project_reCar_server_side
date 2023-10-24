const express = require("express");
const router = express.Router();
const {
  deleteBookingById,
  getBookings,
  getBookingsById,
  postBooking,
} = require("../controllers/bookings.controller");

router.get("/", getBookings);
router.get("/:id", getBookingsById);
router.post("/", postBooking);
router.delete("/:id", deleteBookingById);

module.exports = router;
