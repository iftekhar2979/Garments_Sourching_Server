
const userModel=require('../Schema_model/userModel.js')
const {generateToken }=require('../utils/generateToken.js')
const {compareHashPassword, generateHashedPassword, }=require('../utils/generateHashedPassword.js')
const asyncHandler=require('express-async-handler')

// Registration
 const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  // Check Inputs
  if (!name || !email || !password) throw new Error(`Provide All User Details`);

  // Check Exicting User
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error(`User Already Exists`);

  // Register New User
  const hashedPassword = await generateHashedPassword(password);
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      message: `Registration Successfull`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid User Data`);
  }
});

// Login
 const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check Inputs
  if (!email || !password) throw new Error(`Provide Valid User Details`);

  // User Data Check
  const validUser = await userModel.findOne({ email });
  if (!validUser) throw new Error(`Invalid User Details`);
  const validPassword = await compareHashPassword(password, validUser.password);
  if (validUser && validPassword) {
    generateToken(res, validUser._id);
    const data = {
      _id: validUser._id,
      name: validUser.name,
      email: validUser.email,
      isAdmin: validUser.isAdmin,
      mybookings: validUser.mybookings,
    };
    res.status(200).json({
      data,
      message: `Login Successfull`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid User Details`);
  }
});

// Logout
 const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: `User Logged Out ☹️` });
});

// Get User Data
const getUserProfile = asyncHandler(async (req, res) => {
  const data = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    
  };
  res.status(200).json({ data });
});

// Update User Data
 const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  // Check User
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Updating Details
    if (req.body.password) {
      user.password = await generateHashedPassword(req.body.password);
    }
    const updatedUser = await user.save();
    const data = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: user.isAdmin,
      mybookings: user.mybookings,
    };
    res.status(200).json({
      data,
      message: "User Profile Updated",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get All Users Data
 const getAllUsers = asyncHandler(async (req, res) => {
  const allusers = await userModel.find({});
  if (allusers) {
    res.status(200).json({
      data: allusers,
      message: `All user details fetched`,
    });
  } else {
    res.status(400);
    throw new Error(`Problem while fetching user datas`);
  }
});
module.exports={getAllUsers,updateUserProfile,getUserProfile,logoutUser,loginUser,registerUser}