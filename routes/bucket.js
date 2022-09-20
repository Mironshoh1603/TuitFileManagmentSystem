const router = require('express').Router();
const FileController = require('../controllers/file');
const authController = require('../controllers/authController');

router
  .route('/:key')
  .get(
    FileController.getFileFromBucket
  );

module.exports = router;
