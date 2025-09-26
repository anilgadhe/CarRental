import express from "express";
import { protect } from "../middlewars/auth.js";
import {checkAvailabilityOfCar,createBooking,getUserBookings,getOwnerBookings,changeBookingsStatus} from "../controllers/bookingController.js"

const bookingRouter = express.Router();



bookingRouter.post("/check-availability",checkAvailabilityOfCar);
bookingRouter.post("/create",protect,createBooking);
bookingRouter.get("/user",protect,getUserBookings);
bookingRouter.get("/owner",protect,getOwnerBookings);
bookingRouter.post("/change-status",protect,changeBookingsStatus);

export default bookingRouter;