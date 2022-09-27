module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || 'fail';
  err.message = err.message || 'not found';
  if (err.message === 'invalid signature') {
    err.message = 'Your token is not valid!';
  }
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    if (req.originalUrl.startsWith('/api/')) {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
    } else {
      res.status(err.statusCode).render('error', {
        message: err.message,
      });
    }
  } else if (process.env.NODE_ENV === 'PRODUCTION') {
    if (req.originalUrl.startsWith('/api/')) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      res.status(err.statusCode).render('client/error', {
        message: 'Please try again !',
      });
    }
  }
  next();
};
