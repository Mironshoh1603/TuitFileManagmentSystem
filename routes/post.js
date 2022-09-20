const express = require('express');
const PostController = require('../controllers/post');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(

    PostController.getAllPosts
  )
  .post(
    authController.protect,
    authController.role(['admin', 'teacher']),
    PostController.uploadImagePost,
    PostController.resizeImage,
    PostController.addPost
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.role(['admin', 'teacher']),
    PostController.getPostById
  )
  .patch(
    authController.protect,
    authController.role(['admin', 'teacher']),
    PostController.uploadImagePost,
    PostController.resizeImage,
    PostController.updatePost
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'teacher']),
    PostController.deletePost
  );

module.exports = router;
