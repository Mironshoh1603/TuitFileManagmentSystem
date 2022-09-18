const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./middlewares/app');
const DB = require('./config/db');
// Unhandeled Rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥');
  console.log(err.name, err.message);
  process.exit(1);
});

// Unhandled Excpections
// process.on('uncaughtException', (err) => {
//   console.log('UNHANDLED Excpections 💥');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

DB();

app.listen(+process.env.PORT, process.env.SERVER_URL, () => {
  console.log(`Server running on port...`);
});
