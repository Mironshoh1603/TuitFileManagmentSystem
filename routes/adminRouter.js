const router = require('express').Router();
const adminController = require('./../Controllers/admin');

// router.route('/contact').get(adminController.contact);
router.route('/').get(adminController.home);
// router.route('/teachers').get(adminController.teacherRender);
// router.route('/login').get(adminController.loginRender);
// router.route('/about').get(adminController.aboutRender);

module.exports = router;
