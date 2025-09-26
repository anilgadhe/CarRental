import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken"
import Car from "../models/car.js"

function createJWT(user_id) {
  return JWT.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

const registerUser = async (req, res) => {

  try {
    const { name, password, email } = req.body;

    if (!name || !email || password.length < 8) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      password: hashedpassword,
      email: email,
    });

    await newUser.save();

    const token = createJWT(newUser._id.toString())

    return res.status(201).json({success:true, message: "user register successfully:", token });

  } catch (error) {
    return res.status(500).json({
      message: " failed to  register user:",
      error: error
    });

  }

}



const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const user = await User.findOne({ email });

    const token = createJWT(user._id.toString());

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
      return res.status(400).json({ message: "invalid password" });
    }

    res.status(200).json({
      success:true,
      message: "succesfully login",
      token,
      data: user
    })

  } catch (error) {
    return res.status(400).json({success:false, message:message.error });

  }
}


//getUser User data using Token (JWT)

const getUserData = async (req, res) => {
  try {

    const { user } = req;

    if (user) {
      return res.json({ message: "successfull", user });
    }

  } catch (error) {
    return res.json({ message: error });

  }
}


//Get All Cars for the Frontend
const getCars = async (req, res) => {
  try {

    const cars =await Car.find({isAvaliable:true});

    res.json({success:true,cars});

  } catch (error) {
    console.log(error.message);
    return res.json({ success:false,message: error.message });

  }
}



export { registerUser, loginUser ,getUserData,getCars}