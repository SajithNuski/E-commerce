import userModel from "../models/userModule.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// route for user login
const loginUser = async (req, res) => {
  
};

// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // validate email format and password strength
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
    }

    // hash the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user);
    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred while registering user",
      });
  }
};

// route for admin login

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
