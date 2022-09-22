const catchErrorAsync = require('../utility/catchErrorAsync');

const home = catchErrorAsync(async (req, res, next) => {
  res.render('admin/index');
});

const kitob = catchErrorAsync(async (req, res, next) => {
  res.render('admin/book');
});

module.exports = { home, kitob };
