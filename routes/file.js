const express = require('express');
const FileController = require('../controllers/file');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(FileController.getAllFiles)
  .post(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.uploadFiles,
    FileController.middleware,
    FileController.addFile
  );

router
  .route('/:id')
  .get(FileController.getFileById)
  .patch(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.uploadFiles,
    FileController.updateFile
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.deleteFile
  );
router.route('/search').post(FileController.fileSearch);

module.exports = router;
