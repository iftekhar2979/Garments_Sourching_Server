const billOfExchangeModel = require('../Schema_model/billOfExchangeSchema'); // Import the bill of exchange model

// CREATE: Add a new Bill of Exchange document
const createBillOfExchange = async (billData) => {
  try {
    const newBill = new billOfExchangeModel(billData);
    await newBill.save();
    return newBill;
  } catch (error) {
    throw new Error('Error creating Bill of Exchange: ' + error.message);
  }
};

// READ: Get all Bill of Exchange documents
const getAllBills = async () => {
  try {
    const bills = await billOfExchangeModel.find();
    return bills;
  } catch (error) {
    throw new Error('Error retrieving Bills of Exchange: ' + error.message);
  }
};

// READ: Get a Bill of Exchange by ID
const getBillById = async (id) => {
  try {
    const bill = await billOfExchangeModel.findById(id);
    if (!bill) {
      throw new Error('Bill of Exchange not found');
    }
    return bill;
  } catch (error) {
    throw new Error('Error retrieving Bill of Exchange: ' + error.message);
  }
};

// UPDATE: Update Bill of Exchange details by ID
const updateBillOfExchange = async (id, updatedData) => {
  try {
    const bill = await billOfExchangeModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!bill) {
      throw new Error('Bill of Exchange not found');
    }
    return bill;
  } catch (error) {
    throw new Error('Error updating Bill of Exchange: ' + error.message);
  }
};

// DELETE: Delete a Bill of Exchange by ID
const deleteBillOfExchange = async (id) => {
  try {
    const bill = await billOfExchangeModel.findByIdAndDelete(id);
    if (!bill) {
      throw new Error('Bill of Exchange not found');
    }
    return { message: 'Bill of Exchange deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting Bill of Exchange: ' + error.message);
  }
};

module.exports = {
  createBillOfExchange,
  getAllBills,
  getBillById,
  updateBillOfExchange,
  deleteBillOfExchange
};
