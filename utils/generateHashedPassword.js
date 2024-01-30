const bcrypt=require('bcrypt')

 const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

 const compareHashPassword = async (password, dbPassword) => {
  const validating = await bcrypt.compare(password, dbPassword);
  if (validating) return true;
};
module.exports={generateHashedPassword,compareHashPassword}