const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Post nomi boshqa postlarnikiga o'xshamasligi kerak!"],
      required: [true, 'Post nomi shart!'],
      trim: true,
      maxlength: 64,
      minlength: 3,
    },
    photo: {
      type: String,
      required: [true, 'Post suratini kiritshingiz shart'],
    },
    text: {
      type: String,
      minlength: 200,
      required: [true, 'Post matnini kiritishingiz shart!'],
    },
    teacherId: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model('posts', postSchema);

module.exports = post;
