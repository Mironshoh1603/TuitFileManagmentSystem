const express = require('express');
const morgan = require('morgan');
const userRouter = require('../routes/userRoutes');
const AppError = require('../utility/appError');
const ErrorController = require('../controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const pug = require('pug');
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(express.json({ limit: '10kb' }));
app.use(urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(sanitize());

app.use(xss());

app.use(hpp());

app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from Middelware');
  next();
});

// app.use((req, res, next) => {
//   req.time = '12.04.2022';
//   next();
// });

const limit = rateLimit({
  max: 100,
  windowMs: 1 * 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again later',
});

app.use('/api', limit);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'This server is working!',
//     data: 'Bu yerda json chiqishi kerak edi',
//   });
// });

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/users', userRouter);

app.all('*', function (req, res, next) {
  next(new AppError(`this url has not found: ${req.originalUrl}`, 404));
});

app.use(ErrorController);

module.exports = app;

// Overview of Error handling

// 1)Operation errors
//
// 1. Xato url berish
// 2. Inputga kiritilayotgan xato malumot
// 3. Serverga tugri ulanolmaslik (Sekin internet)
// 4. Database ulanolmaslik
// 5....

// 2)Programming Errors
//
// 1. property ni uqiyotganda undefined bulishi
// 2. await dan foydalanish async siz
// 3. req.body ni ishlatish req.query urniga
// 4....

// Global Error handling middleware
