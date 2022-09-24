const router = require('express').Router();
const viewController = require('./../Controllers/viewController');
const adminController = require('./../Controllers/admin');
const authController = require('./../Controllers/authController');
router.route('/topics').get(viewController.salom);
router.route('/books').get(viewController.books);
router.route('/contact').get(viewController.contact);
router.route('/').get(viewController.home);
router.route('/teachers').get(viewController.teacherRender);
router.route('/login').get(viewController.loginRender);
router.route('/logout').post( authController.isSignIn,authController.logout);
router.route('/about').get(viewController.aboutRender);
router.route('/admin/book').get(adminController.kitoblar);

module.exports = router;
