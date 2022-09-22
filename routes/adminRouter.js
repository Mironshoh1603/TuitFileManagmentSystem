const router = require('express').Router();
const adminController = require('./../Controllers/admin');

// router.route('/contact').get(adminController.contact);
router.route('/teachers').get(adminController.teacherRender);
router.use('/profil', adminController.profil);
router.route('/subject').get(adminController.subject);
// router.route('/teachers').get(adminController.teacherRender);
// router.route('/login').get(adminController.loginRender);
// router.route('/about').get(adminController.aboutRender);
router.route('/').get(adminController.home);

module.exports = router;
