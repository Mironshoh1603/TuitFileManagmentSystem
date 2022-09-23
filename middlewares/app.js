const express = require('express');
const morgan = require('morgan');
const userRouter = require('../routes/userRoutes');
const subjectRouter = require('../routes/subject');
const fileRouter = require('../routes/file');
const postRouter = require('../routes/post');
const bucketRouter = require('../routes/bucket');
const viewRoute = require('./../routes/view_route');
const adminRouter = require('./../routes/adminRouter');
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
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formData = require('express-form-data');
const formidable = require('express-formidable');
const multer = require('multer');
const upload = multer();
const app = express();
// app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(formidable());

// app.use(formData.parse());
// app.use((req, res, next) => {
//   console.log(req.body, 'Body ekan');
//   next();
// });

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// app.use(express.json()); // Used to parse JSON bodies
// app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library
// or
// app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.use(sanitize());

app.use(xss());

app.use(hpp());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(morgan('tiny'));

// app.use((req, res, next) => {
//   req.time = '12.04.2022';
//   next();
// });

// const limit = rateLimit({
//   max: 100,
//   windowMs: 1 * 60 * 60 * 1000,
//   message: 'Too many requests from this IP, Please try again later',
// });

// app.use('/api', limit);

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

// app.use(app.router);
app.use('/', viewRoute);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/buckets', bucketRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/admin', adminRouter);
app.all('*', function (req, res, next) {
  next(new AppError(`this url has not found: ${req.originalUrl}`, 404));
});

app.use(ErrorController);

module.exports = app;
