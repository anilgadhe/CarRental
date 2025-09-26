import User from "../models/userModel.js";
import fs from "fs";
import imagekit from "../utils.js/imageKit.js";
import upload from "../middlewars/multer.js";
import Car from "../models/car.js";
import Booking from "../models/Booking.js";

export const changeRoleRoOwner = async (req, res) => {
    try {
        const { _id } = req.user;

        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({ success: true, message: "Now you can list cars" })

    } catch (error) {
        res.json({ success: false, message: "not authorized" })

    }
}

//API to List Car

export const addCar = async (req, res) => {
    try {

        const { _id } = req.user;

        if(!_id){
            res.json({success:false,message:"owner id is required"});
        }
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        });


        // URL with basic transformations
        const transformedUrl = imagekit.url({

            path: response.filePath,
            transformation: [
                { width: '1280' },// Width resizing
                { quality: 'auto' },//auto compression
                { format: 'webp' },//Convert to modern format    
            ],
        });
        // Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg?tr=w-400,h-300,c-maintain_ratio,q-80,f-webp

        const image = transformedUrl;
        await Car.create({ ...car, owner: _id, image });

        res.json({ success: true, message: "Car added" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


//Apito List Owner Cars

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;

        if (!_id) {
            res.json({ success: false, message: "owner id required" })

        }

        const Cars = await Car.find({ owner: _id });
        res.json({ success: true, Cars })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


//Api to Toggle Car Availability

export const toggleCarAvailability = async (req, res) => {

    try {
        const { _id } = req.user;
        const { CarId } = req.body;

        const car = await Car.findById(CarId);

        //Checking is car belongs to the user
        if (car.owner.toString() !== _id.toString()) {

            return res.json({ success: false, message: "Unauthorized" });

        }

        car.isAvaliable = !car.isAvaliable

        await car.save();

        res.json({ success: true, message: "Availability Toggled" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }


}

//Cheking is car belongs to the user

export const deleteCar = async (req, res) => {

    try {
        const { _id } = req.user;
        const { CarId } = req.body;

        const car = await Car.findById(CarId);

        //Checking is car belongs to the user
        if (car.owner.toString() !== _id.toString()) {

            return res.json({ success: false, message: "Unauthorized" });

        }

        car.owner = null;
        car.isAvaliable = false;

        await car.save();

        res.json({ success: true, message: "Car Removed" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }


}


//Api to ger Dashboard data

export const getDasnboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== 'owner') {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

    const pendingBookings = bookings.filter(b => b.status === "pending");
    const completedBookings = bookings.filter(b => b.status === "confirmed");

    const monthlyRevenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((acc, b) => acc + (b.price || 0), 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue
    };

    res.json({ success: true, dashboardData });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//APi to update user image

export const updateUserImage = async (req, res) => {
    try {

        const { _id } = req.user;

        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        });


        // URL with basic transformations
        const transformedUrl = imagekit.url({

            path: response.filePath,
            transformation: [
                { width: '400' },// Width resizing
                { quality: 'auto' },//auto compression
                { format: 'webp' },//Convert to modern format    
            ],
        });
        // Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg?tr=w-400,h-300,c-maintain_ratio,q-80,f-webp

        const image = transformedUrl;

        await User.findByIdAndUpdate(_id,{image});

        res.json({success:true,message:"Image updated"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}