import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoConnection from "./utils.js/connect.js";
import {userRouter} from "./routes/userRoutes.js"
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;


await mongoConnection(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({message:"server is running"});
})

app.use('/user/v1',userRouter);
app.use('/owner/v1',ownerRouter);
app.use('/bookings/v1',bookingRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you requested cannot be found!");
});

app.listen(`${PORT}`,()=>{
    console.log(`app is running on : http://localhost:${PORT}`);
});