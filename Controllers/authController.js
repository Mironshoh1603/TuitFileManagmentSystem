const User = require('../models/user');
const catchErrorAsync = require('../utility/catchErrorAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utility/appError');
const bcrypt = require('bcryptjs');
const mail = require('../utility/mail');
const crypto = require('crypto');

const Email = require('../utility/mail.js');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const cookieOptions = {
  maxAge: 60 * 10 * 1000,
  httpOnly: true,
};

if (process.env.NODE_ENV === 'PRODUCTION') {
  cookieOptions.secure = true;
}

const saveTokenCookie = (res, token) => {
  res.cookie('jwt', token, cookieOptions);
};

// const signup = async (req, res, next) => {
//   try {
//     const newUser = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//       photo: req.body.photo,
//       passwordConfirm: req.body.passwordConfirm,
//       passwordChangedDate: req.body.passwordChangedDate,
//     });
//     const token = createToken(newUser._id);
//     saveTokenCookie(res, token);

//     res.status(200).json({
//       status: 'success',
//       token: token,
//       data: newUser,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       err: err.message,
//     });
//   }
// };

const login = async (req, res, next) => {
  try {
    // 1) Email bilan password borligini tekshirish

    const { email, password } = { ...req.body };

    if (!email || !password) {
      return next(new AppError('Email yoki passwordni kiriting! Xato!!!', 401));
    }

    // 2) Shunaqa odam bormi yuqmi shuni tekshirish
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(
        new AppError('Bunday user mavjud emas. Iltimos royxatdan uting!', 404)
      );
    }

    // 3) password tugri yokin notugriligini tekshirish
    const tekshirHashga = async (oddiyPassword, hashPassword) => {
      const tekshir = await bcrypt.compare(oddiyPassword, hashPassword);
      return tekshir;
    };

    if (!(await tekshirHashga(password, user.password))) {
      return next(
        new AppError(
          'Sizning parol yoki loginingiz xato! Iltimos qayta urinib kuring!',
          401
        )
      );
    }
    // 4) JWT token yasab berish
    const token = createToken(user._id);
    saveTokenCookie(res, token);
    // 5) Response qaytarish
    res.status(200).json({
      status: 'success',
      token: token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err: err,
    });
  }
};

const protect = async (req, res, next) => {
  // 1) Token bor yuqligini headerdan tekshirish
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('Siz tizimga kirishingiz shart!'));
  }
  // 2) Token ni tekshirish Serverniki bilan clientnikini solishtirish

  const tokencha = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(tokencha);
  // 3) Token ichidan idni olib databasedagi userni topamiz.
  const user = await User.findById(tokencha.id);

  if (!user) {
    return next(
      new AppError(
        'Bunday user mavjud emas. Iltimos tizimga qayta kiring!',
        401
      )
    );
  }

  // 4) Agar parol uzgargan bulsa tokeni amal qilmasligini tekshirish
  if (user.passwordChangedDate) {
    console.log(user.passwordChangedDate.getTime() / 1000);
    // console.log(tokencha.iat);
    if (user.passwordChangedDate.getTime() / 1000 > tokencha.iat) {
      return next(
        new AppError(
          'Sizning tokeningiz yaroqsiz! Iltimos qayta tizimga kiring!',
          401
        )
      );
    }
  }

  req.user = user;
  res.locals.userData = user;
  next();
};

const isSignIn = async (req, res, next) => {
  // 1) Token bor yuqligini headerdan tekshirish
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token || token === 'logout') {
    return next();
  }
  // 2) Token ni tekshirish Serverniki bilan clientnikini solishtirish

  const tokencha = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(tokencha);
  // 3) Token ichidan idni olib databasedagi userni topamiz.
  const user = await User.findById(tokencha.id);

  if (!user) {
    return next();
  }

  // 4) Agar parol uzgargan bulsa tokeni amal qilmasligini tekshirish
  if (user.passwordChangedDate) {
    // console.log(tokencha.iat);
    if (user.passwordChangedDate.getTime() / 1000 > tokencha.iat) {
      return next();
    }
  }

  res.locals.userData = user;
  return next();
};

const role = (roles) => {
  return catchErrorAsync(async (req, res, next) => {
    // 1) User ni roleni olamiz databasedan, tekshiramiz
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Siz bu amaliyotni bajarish huquqiga ega emassiz!', 401)
      );
    }
    next();
  });
};

const forgotPassword = catchErrorAsync(async (req, res, next) => {
  // 1) Email bor yuqligini tekshirish
  if (!req.body.email) {
    return next(
      new AppError('Emailni kiritishingiz Shart! Iltimos Emailni kiriting!')
    );
  }
  // 2) user email orqali database dan qidirish
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError('Bunday foydalanuvchi malumotlar bazasida mavjud emas!', 404)
    );
  }

  // 3) ResetToken yaratish

  const token = user.hashTokenMethod();
  await user.save({ validateBeforeSave: false });

  // 4) Email ga junatish resetToken ni

  const resetLink = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${token}`;

  const subject = 'Reset password qilish uchun link';
  const html = `<h1>Siz passwordni reset qilish uchun quydagi tugamani bosing</h1> <a style="color:red; background-color: white" href='${resetLink}'>Reset Password</a>`;
  const to = req.body.email;

  await mail({ subject, html, to });

  res.status(200).json({
    status: 'Success',
    message: 'Your token has been sent to Email',
  });

  next();
});

const resetPassword = catchErrorAsync(async (req, res, next) => {
  // 1) Token olamiz
  const token = req.params.token;
  const hashToken = crypto.createHash('sha256').update(token).digest('hex');

  // 2) Token tekshiramiz -> tugri notugri ekanligi va vaqt utib ketmaganligi
  const user = await User.findOne({
    resetTokenHash: hashToken,
    resetTokenVaqti: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError(
        'Tokenda xatolik mavjud. Iltimos qayta passwordni unutdim qiling!',
        404
      )
    );
  }

  // 3) Yangi parol ni saqlaymiz va yangi parolni vaqtni ham saqlaymiz
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError('Siz parolni kiritishingiz shart!', 404));
  }

  if (!(req.body.password === req.body.passwordConfirm)) {
    return next(new AppError('Kiritilgan parollar bir biriga mos emas!', 404));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedDate = Date.now();

  user.resetTokenHash = undefined;
  user.resetTokenVaqti = undefined;

  await user.save();

  // 4) JWT yuboramiz
  const tokenJWT = createToken(user._id);
  saveTokenCookie(res, tokenJWT);
  res.status(200).json({
    status: 'success',
    token: tokenJWT,
    message: 'Password yangilandi',
  });
  next();
});

const updatePassword = catchErrorAsync(async (req, res, next) => {
  // 1) Get user info or model

  if (req.body.password === req.body.newPassword) {
    return next(
      new AppError('Yangi password eskisi bilan birxil bulmasligi kerak', 401)
    );
  }

  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(
      new AppError(
        'Malumotlar bazidan topilmadingiz, iltimos qayta tizimga kiring',
        401
      )
    );
  }
  // 2) check password posted

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError('Eski passwordni notugri kiritdingiz', 401));
  }
  // 3) update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) send JWT token

  const token = createToken(user._id);
  saveTokenCookie(res, token);
  res.status(200).json({
    status: 'success',
    token: token,
    message: 'Your password has been updated!',
  });
});

const logout = (req, res, next) => {
  res.cookie('jwt', 'logout', {
    httpOnly: true,
  });
  res.status(200).json({
    status: 'Success',
  });
};

module.exports = {
  // signup,
  login,
  protect,
  role,
  forgotPassword,
  resetPassword,
  updatePassword,
  isSignIn,
  logout,
  saveTokenCookie,
};
