const router = require('express').Router();
const adminController = require('./../Controllers/admin');
const authController = require('./../Controllers/authController');
// router.route('/contact').get(adminController.contact);
router.route('/teachers').get(adminController.teacherRender);
router.use('/profil', adminController.profil);
router.route('/subject').get(authController.protect, adminController.subject);

// router.route('/teachers').get(adminController.teacherRender);
// router.route('/login').get(adminController.loginRender);
// router.route('/about').get(adminController.aboutRender);

router.route('/').get(adminController.home);
// const authController = require('./../Controllers/authController');
// router.route('/contact').get(adminController.contact);
router
  .route('/teachers')
  .get(authController.protect, adminController.teacherRender);
router.use('/profil', authController.protect, adminController.profil);
router.route('/subject').get(authController.protect, adminController.subject);
// router.route('/teachers').get(adminController.teacherRender);
// router.route('/login').get(adminController.loginRender);
// router.route('/about').get(adminController.aboutRender);
router.route('/').get(authController.protect, adminController.home);

module.exports = router;
