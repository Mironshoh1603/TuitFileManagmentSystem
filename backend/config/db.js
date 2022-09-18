const mongoose = require('mongoose');

const DB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('db ulandi');
  } catch (error) {
    console.log('mongo ulanmadi');
  }
};

module.exports = DB;
