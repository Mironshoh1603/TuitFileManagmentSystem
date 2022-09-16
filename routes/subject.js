const express = require('express');
const subjectController = require('../controllers/subject');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(

    subjectController.getAllSubjects
  )
  .post(
    authController.protect,
    authController.role(['admin', 'teacher']),
    subjectController.uploadImageSubject,

    subjectController.resizeImage,
    subjectController.addSubject
  );

router
  .route('/:id')
  .get(

    subjectController.getSubjectById
  )
  .patch(
    authController.protect,
    authController.role(['admin', 'teacher']),
    subjectController.uploadImageSubject,
    subjectController.resizeImage,
    subjectController.updateSubject
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'teacher']),
    subjectController.deleteSubject
  );

module.exports = router;
