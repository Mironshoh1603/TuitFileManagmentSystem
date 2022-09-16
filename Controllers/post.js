const Post = require('../models/Post');
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
//     cb(null, 'public/img/Posts/');
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

const uploadImagePost = upload.single('photo');

const resizeImage = catchErrorAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const ext = req.file.mimetype.split('/')[1];
  req.file.filename = `Post-${req.user.id}-${Date.now()}.${ext}`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .toFile(`${__dirname}/../public/img/posts/${req.file.filename}`);
  req.body.photo = req.file.filename;

  next();
});

const options = {
  path: 'teacherId',
  select: 'name',
};

const getAllPosts = getAll(Post, options);
const addPost = addOne(Post);
const getPostById = getOne(Post, options);
const updatePost = updateOne(Post);
const deletePost = deleteOne(Post);

module.exports = {
  getAllPosts,
  addPost,
  getPostById,
  updatePost,
  deletePost,
  resizeImage,
  uploadImagePost,
};
