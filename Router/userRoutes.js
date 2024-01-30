
const express=require('express')
const {registerUser,loginUser,logoutUser,getUserProfile,updateUserProfile, getAllUsers,}=require("../controller/userControllers.js")
const {protect}=require('../middleWare/protectMiddleware.js')
const router = express.Router();

// Registration /api/users/signup
router.route("/signup").post(protect,registerUser);

// Login /api/users/signin
router.route("/signin").post(loginUser);

// Logout /api/users/logout
router.route("/logout").post(logoutUser);

//Get profile
router.route("/profile").get(protect, getUserProfile);

// Update User Data
router.route("/profile").put(protect, updateUserProfile);

// Get All Users
router.route("/allusers").get(getAllUsers);

module.exports= router;
