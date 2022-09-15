const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
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
});

const subject = mongoose.model('subjects', subjectSchema);

module.exports = subject;
