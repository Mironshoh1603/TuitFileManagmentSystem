const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Fan nomi boshqa fanlarnikiga o'xshamasligi kerak!"],
      required: [true, 'Fan nomi shart!'],
      trim: true,
      maxlength: 64,
      minlength: 3,
    },
    photo: {
      type: String,
      required: [true, 'Fan suratini kiritshingiz shart'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subjectSchema.virtual('files', {
  ref: 'files',
  localField: '_id',
  foreignField: 'subjectId',
});
subjectSchema.virtual('teachers', {
  ref: 'users',
  localField: '_id',
  foreignField: 'subjects',
});
const subject = mongoose.model('subjects', subjectSchema);

module.exports = subject;
