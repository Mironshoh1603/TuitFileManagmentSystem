const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  file: {
    type: String,
    required: [true, 'Fileni berilishi shart!'],
    select: false,
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
  key: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'File nomi berilishi shart!'],
    trim: true,
    maxlength: 64,
    minlength: 3,
  },
});

const file = mongoose.model('files', fileSchema);

module.exports = file;
