const File = require('../models/file');
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

const AppError = require('../utility/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${file.originalname}`);
  },
});

// const multerStorage = multer.memoryStorage();

const filterFile = (req, file, cb) => {
  // console.log(file, 'sksnvkjen');
  req.file = file;
  console.log(req.file, 'vevev');

  if (
    ['zip', 'rar', 'pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(
      file.originalname.split('.').slice(-1)[0]
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "You must upload only 'zip', 'rar', 'pdf', 'doc', 'docx', 'xls', 'xlsx' formats or Your files is letter than 100mb",
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filterFile,
});

const uploadFile = upload.single('file');

const getAllFiles = getAll(File);
const addFile = addOne(File);
const getFileById = getOne(File);
const updateFile = updateOne(File);
const deleteFile = deleteOne(File);

const middleware = (req, res, next) => {
  req.body.size = req.file.size;
  req.body.file = req.file.filename;
  console.log(req.file, 'manabu');
  next();
};

module.exports = {
  getAllFiles,
  addFile,
  getFileById,
  updateFile,
  deleteFile,
  middleware,
  uploadFile,
};
