const File = require('../models/file');
const catchErrorAsync = require('../utility/catchErrorAsync');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require('../utility/s3');
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

const options = {
  path: 'subjectId',
  select: 'name',
};

const options2 = {
  path: 'teacherId',
  select: 'name photo email',
};
// const multerStorage = multer.memoryStorage();

const upload = multer({
  dest: 'public/files/',
  storage: multerStorage,
  fileFilter: filterFile,
  limits: { fileSize: 1000000000000000000 },
});

const uploadFiles = upload.single('file');

const getAllFiles = getAll(File, options, options2);
const addFile = addOne(File);
const getFileById = getOne(File, options, options2);
const updateFile = updateOne(File);
const deleteFile = deleteOne(File);

const fileSearch = catchErrorAsync(async (req, res, next) => {
  let data = await File.find({
    name: { $regex: `${req.query.search}`, $options: 'i' },
  }).limit(5);
  if (!data[0]) {
    res.status(200).json({
      status: 'Succes',
      message: 'no data',
    });
    return;
  }
  res.status(200).json({
    status: 'Succes',
    result: data.length,
    data: data,
  });
});

const getFileFromBucket = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const key = req.params.key;
  res.attachment(key);
  const readStream = getFileStream(key);

  readStream.pipe(res);
};

const middleware = catchErrorAsync(async (req, res, next) => {
  req.body.size = req.file.size;
  req.body.file = req.file.filename;
  const file = req.file;
  console.log(file);

  // apply filter
  // resize

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  req.body.key = result.Key;
  next();
});

module.exports = {
  getAllFiles,
  addFile,
  getFileById,
  updateFile,
  deleteFile,
  middleware,
  uploadFiles,
  getFileFromBucket,
  fileSearch,
};
