const router = require('express').Router();
const viewController = require('./../Controllers/viewController');
router.route('/subjects').get(viewController.subjects);
router.route('/books').get(viewController.books);
router.route('/contact').get(viewController.contact);
router.route('/').get(viewController.home);
router.route('/users').get(viewController.teacherRender);
router.route('/login').get(viewController.loginRender);
router.route('/about').get(viewController.aboutRender);

module.exports = router;
