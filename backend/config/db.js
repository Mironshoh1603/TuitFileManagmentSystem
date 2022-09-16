const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });
