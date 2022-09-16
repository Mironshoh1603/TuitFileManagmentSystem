const mongoose = require('mongoose');
const fs = require('fs');

const File = require('./models/file');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

const deleteData = async () => {
  try {
    // await tourModel.deleteMany();
    await File.deleteMany();
    // await reviewModel.deleteMany();
    console.log('Top toza');
  } catch (err) {
    console.log('Kir');
  }
};
deleteData();
// addData();
