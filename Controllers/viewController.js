const home = async (req, res, next) => {
  try {
    res.render('base');
  } catch (error) {
    console.log(error);
  }
};
module.exports = { home };
