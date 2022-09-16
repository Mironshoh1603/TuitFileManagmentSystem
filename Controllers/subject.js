const Subject = require('../models/subject');
const catchErrorAsync = require('../utility/catchErrorAsync');
const {
  getAll,
  addOne,
  getOne,
  updateOne,
  deleteOne,
} = require('./handlerController');

const { saveTokenCookie } = require('./authController');
const multer = require('multer');
const sharp = require('sharp');

const AppError = require('../utility/appError');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/Subjects/');
//   },
//   filename: (req, file, cb) => {

//     cb(null, loc);
//   },
// });

const multerStorage = multer.memoryStorage();

const filterImage = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('You must upload only image format', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filterImage,
});

const uploadImageSubject = upload.single('photo');

const resizeImage = catchErrorAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const ext = req.file.mimetype.split('/')[1];
  req.file.filename = `Subject-${req.user.id}-${Date.now()}.${ext}`;
  await sharp(req.file.buffer)
    .resize(1000, 1000)
    .toFormat('jpeg')
    .toFile(`${__dirname}/../public/img/subjects/${req.file.filename}`);
  console.log(req.file.filename, 'manabuyam');
  req.body.photo = req.file.filename;
  next();
});

const options = {
  path: 'files',
};
const options2 = {
  path: 'teachers',
};

const getAllSubjects = getAll(Subject, options, options2);
const addSubject = addOne(Subject);
const getSubjectById = getOne(Subject, options, options2);
const updateSubject = updateOne(Subject);
const deleteSubject = deleteOne(Subject);

module.exports = {
  getAllSubjects,
  addSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
  resizeImage,
  uploadImageSubject,
};
