const router = require('express').Router();
const adminController = require('./../Controllers/admin');
const authController = require('./../Controllers/authController');
router
  .route('/users')
  .get(authController.protect, adminController.teacherRender);
router.use('/profil', authController.protect, adminController.profil);
router.route('/subjects').get(authController.protect, adminController.subject);
router.route('/books').get(authController.protect, adminController.kitoblar);
router.route('/search').get(adminController.search);
// router.route('/teachers').get(adminController.teacherRender);
// router.route('/login').get(adminController.loginRender);
// router.route('/about').get(adminController.aboutRender);
router.route('/').get(authController.protect, adminController.home);

module.exports = router;
