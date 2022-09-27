const User = require('../models/user');
const catchErrorAsync = require('../utility/catchErrorAsync');
const {
  getAll,
  addOne,
  getOne,
  updateOne,
  deleteOne,
} = require('./handlerController');
const { saveTokenCookie, createToken } = require('./authController');

const multer = require('multer');
const sharp = require('sharp');

const AppError = require('../utility/appError');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users/');
//   },
//   filename: (req, file, cb) => {

//     cb(null, loc);
//   },
// });

const multerStorage = multer.memoryStorage();

const filterImage = (req, file, cb) => {
  console.log(file, 'Manabu ekan');
  if (file.mimetype.startsWith('image')) {
    req.file = file;
    cb(null, true);
  } else {
    cb(new AppError('You must upload only image format', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filterImage,
});

const uploadImageUser = upload.single('photo');

const resizeImage = catchErrorAsync(async (req, res, next) => {
  console.log(!req.file, 'men');
  if (!req.file) {
    return next();
  }
  const ext = req.file.mimetype.split('/')[1];

  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .toFile(`${__dirname}/../public/img/users/${req.file.filename}`);
  next();
});

const options = {
  path: 'subjects',
  select: '-_id',
};

const options2 = {
  path: 'files',
};

const middleware = catchErrorAsync(async (req, res, next) => {
  console.log(req.body, 'Manabu bodyni ichi');
  next();
});

const exampleAddUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: 'Succes',
      data: user,
    });
  } catch (err) {
    console.log('erdkvod', err);
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
const getAllUsers = getAll(User, options, options2);
const addUser = addOne(User);
const getUserById = getOne(User, options, options2);
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

const updateMe = catchErrorAsync(async (req, res, next) => {
  //1) user password not changed
  console.log(req.body, 'body');
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You must not change password by this URL. Please change password url',
        404
      )
    );
  }

  const user = await User.findById(req.user._id);

  // 2) update user info
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.username = req.body.username || user.username;
  user.photo = req.file ? req.file.filename : user.photo;
  // 3) save info into database
  const userUpdateInfo = await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
  });

  const token = createToken(user._id);
  saveTokenCookie(res, token);

  res.status(201).json({
    status: 'success',
    message: 'Your data has been updated',
    data: userUpdateInfo,
    token: token,
  });
});

const userSearch = catchErrorAsync(async (req, res, next) => {
  let regex = new RegExp(req.query.search, 'i');
  let data = await User.find({
    name: regex,
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

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  resizeImage,
  uploadImageUser,
  updateMe,
  userSearch,
  middleware,
  exampleAddUser,
};
