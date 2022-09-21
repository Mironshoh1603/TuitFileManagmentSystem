const catchErrorAsync = require('../utility/catchErrorAsync');
const axios = require('axios');
const User = require('./../models/user');
const home = catchErrorAsync(async (req, res, next) => {
  res.render('admin/index');
});
const teacherRender = catchErrorAsync(async (req, res, next) => {
  res.render('admin/teacher');
});
const profil = catchErrorAsync(async (req, res, next) => {
  const admin = await User.findOne({ role: 'admin' });
  console.log(admin);
  res.render('admin/profil', { admin });
});
module.exports = { home, teacherRender, profil };
