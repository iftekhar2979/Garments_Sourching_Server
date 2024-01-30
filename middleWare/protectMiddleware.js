const jwt=require('jsonwebtoken')
const userModel=require('../Schema_model/userModel.js')
const asyncHandler=require('express-async-handler');

 const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error(`Not Authorized, Invalid Token`);
    }
  } else {
    res.status(401);
    throw new Error(`Not Authorized, No Token`);
  }
});

 const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userId).select("-password");
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(401);
        throw new Error(`Not Authorized`);
      }
    } catch (err) {
      res.status(401);
      throw new Error(`Not Authorized , Admin Access Only`);
    }
  } else {
    res.status(401);
    throw new Error(`Not Authorized, Only Admin`);
  }
});
module.exports={adminProtect,protect}