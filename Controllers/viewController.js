const home = async (req, res, next) => {
  try {
    res.render('home');
  } catch (error) {
    console.log(error);
  }
};
module.exports = { home };
