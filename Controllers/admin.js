const catchErrorAsync = require('../utility/catchErrorAsync');

const home = catchErrorAsync(async (req, res, next) => {
  res.render('admin/index');
});

module.exports = { home };
