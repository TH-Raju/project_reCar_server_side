import { Router } from "express";
import {
  deleteBookingById,
  getBookings,
  getBookingsById,
  postBooking,
} from "../controllers/bookings.controller";
const router = Router();

router.get("/", getBookings);
router.get("/:id", getBookingsById);
router.post("/", postBooking);
router.delete("/:id", deleteBookingById);

export default router;
