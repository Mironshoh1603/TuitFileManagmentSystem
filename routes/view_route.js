const router = require('express').Router();
const viewController = require('./../Controllers/viewController');

router.route('/home').get(viewController.home);
router.route('/teachers').get(viewController.teacherRender);
router.route('/login').get(viewController.loginRender);
router.route('/about').get(viewController.aboutRender);

module.exports = router;
