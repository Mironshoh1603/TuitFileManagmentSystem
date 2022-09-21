const router = require('express').Router();
const viewController = require('./../Controllers/viewController');

router.route('/home').get(viewController.home);
router.route('/topics').get(viewController.salom);
router.route('/books').get(viewController.books);

module.exports = router;
