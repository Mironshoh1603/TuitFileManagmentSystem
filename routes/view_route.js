const router = require('express').Router();
const viewController = require('./../Controllers/viewController');

router.route('/home').get(viewController.home);

module.exports = router;
