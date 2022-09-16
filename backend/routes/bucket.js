const router = require('express').Router();
const FileController = require('../controllers/file');
const authController = require('../controllers/authController');

router
  .route('/:key')
  .get(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.getFileFromBucket
  );

module.exports = router;
