const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// 1.name, 2.email, 3.photo, 4.password, 5.passwordConfirm

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name kiritishingiz shart!'],
      maxlength: 64,
      minlength: 3,
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Siz usernameni kiritishni unutdingiz!'],
      unique: [true, 'Siz oldin foydalanilgan username kiritdingiz'],
    },
    email: {
      type: String,
      required: [true, 'Email kiritishingiz shart!'],
      unique: [true, 'Siz oldin foydalanilgan email kiritdingiz'],
      lowercase: true,
      validate: [validator.isEmail, 'Tugri email kiriting!'],
    },
    photo: {
      type: String,
      default: 'default.jpeg',
    },
    role: {
      type: String,
      enum: ['teacher', 'admin'],
      default: 'teacher',
    },

    password: {
      type: String,
      required: [true, 'Siz passwordni kiritishingiz shart'],
      validate: {
        validator: function (val) {
          return val.length > 7;
        },
        message: "Sizning parolingiz 7 tadan ko'proq bo'lishi kerak! ",
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Siz passwordConfirmni kiritishingiz shart'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Siz bir xil password kiriting',
      },
    },
    passwordChangedDate: {
      type: Date,
      default: null,
    },
    phoneNumber: {
      type: String,
    },
    summary: {
      type: String,
      default:
        "Men bu o'quv yurtida bir necha yillardan buyon ishlayman . Menga o'quvchi yoshlarning ilmga bo'lgan qiziqishlari juda yoqadi!",
    },
    subjects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'subjects',
      },
    ],
    resetTokenHash: String,
    resetTokenVaqti: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    // files: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'files',
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashPassword = await bcrypt.hash(this.password, 12);
  this.password = hashPassword;
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
userSchema.virtual('files', {
  ref: 'files',
  localField: '_id',
  foreignField: 'teacherId',
});

userSchema.methods.hashTokenMethod = function () {
  const token = crypto.randomBytes(32).toString('hex');

  const hashToken = crypto.createHash('sha256').update(token).digest('hex');

  this.resetTokenHash = hashToken;

  this.resetTokenVaqti = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
