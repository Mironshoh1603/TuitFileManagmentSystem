const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  file: {
    type: String,
    required: [true, 'File nomi berilishi shart!'],
    trim: true,
    maxlength: 64,
    minlength: 3,
  },
  size: {
    type: String,
    required: [true, 'Fan suratini kiritshingiz shart'],
  },
  subjectId: {
    type: mongoose.Schema.ObjectId,
    ref: 'subjects',
  },
  teacherId: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
  },
});

const file = mongoose.model('files', fileSchema);

module.exports = file;
