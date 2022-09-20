const router = require('express').Router();
const viewController = require('./../Controllers/viewController');
router.use('/contact', viewController.contact);

router.route('/home').get(viewController.home);
module.exports = router;
