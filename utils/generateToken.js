const jwt=require('jsonwebtoken')

 const generateToken = (res, userId) => {
  try {
    console.log('userId',userId)
    

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="Production",
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Issue With Assiging JWT`);
  }
};
module.exports={generateToken}