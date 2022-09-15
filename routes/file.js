const express = require('express');
const FileController = require('../controllers/file');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.getAllFiles
  )
  .post(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.uploadFile,
    FileController.middleware,
    FileController.addFile
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.getFileById
  )
  .patch(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.uploadFile,
    FileController.updateFile
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'teacher']),
    FileController.deleteFile
  );

module.exports = router;
