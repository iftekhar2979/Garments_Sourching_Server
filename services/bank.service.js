const bankModel = require('../Schema_model/bankInfo'); // Import the bank model

// CREATE: Add a new bank document
const createBank = async (bankData) => {
  try {
    const newBank = new bankModel(bankData);
    await newBank.save();
    return newBank;
  } catch (error) {
    throw new Error('Error creating bank: ' + error.message);
  }
};

// READ: Get all banks
const getAllBanks = async () => {
  try {
    const banks = await bankModel.find();
    return banks;
  } catch (error) {
    throw new Error('Error retrieving banks: ' + error.message);
  }
};

// READ: Get a bank by ID
const getBankById = async (id) => {
  try {
    const bank = await bankModel.findById(id);
    if (!bank) {
      throw new Error('Bank not found');
    }
    return bank;
  } catch (error) {
    throw new Error('Error retrieving bank: ' + error.message);
  }
};

// UPDATE: Update bank details by ID
const updateBank = async (id, updatedData) => {
  try {
    const bank = await bankModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!bank) {
      throw new Error('Bank not found');
    }
    return bank;
  } catch (error) {
    throw new Error('Error updating bank: ' + error.message);
  }
};

// DELETE: Delete a bank by ID
const deleteBank = async (id) => {
  try {
    const bank = await bankModel.findByIdAndDelete(id);
    if (!bank) {
      throw new Error('Bank not found');
    }
    return { message: 'Bank deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting bank: ' + error.message);
  }
};

module.exports = {
  createBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank
};
