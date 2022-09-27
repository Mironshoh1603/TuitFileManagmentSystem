const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.login);
router.route('/me').get(authController.protect, authController.isUser);

router
  .route('/updatePassword')
  .patch(authController.protect, authController.updatePassword);

router
  .route('/updateMe')
  .patch(
    authController.protect,
    userController.uploadImageUser,
    userController.resizeImage,
    userController.updateMe
  );
router.route('/search').post(userController.userSearch);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(
    authController.protect,
    authController.role(['admin']),
    userController.uploadImageUser,
    userController.resizeImage,
    userController.middleware,
    userController.addUser
  );
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(
    authController.protect,
    authController.role(['admin']),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.role(['admin']),
    userController.deleteUser
  );

module.exports = router;
