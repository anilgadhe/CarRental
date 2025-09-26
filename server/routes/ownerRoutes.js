import express from "express";
import { protect } from "../middlewars/auth.js";
import {changeRoleRoOwner, updateUserImage} from "../controllers/ownerController.js"
import upload from "../middlewars/multer.js";
import {addCar, getDasnboardData,getOwnerCars,toggleCarAvailability,deleteCar} from "../controllers/ownerController.js"

const ownerRouter = express.Router();

ownerRouter.post("/change-role",protect, changeRoleRoOwner);
ownerRouter.post("/add-car",protect,upload.single("image"), addCar);
ownerRouter.get("/cars",protect,getOwnerCars);
ownerRouter.post("/toggle-car",protect,toggleCarAvailability);
ownerRouter.post("/delete-car",protect,deleteCar);



ownerRouter.get("/dashboard",protect,getDasnboardData);
ownerRouter.post("/update-image",upload.single("image"),protect, updateUserImage)


export default ownerRouter;