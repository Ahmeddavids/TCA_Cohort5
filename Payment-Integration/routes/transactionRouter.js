const { initialPayment, verifyPayment } = require('../controllers/transactionController');

const router = require('express').Router();

router.post('/initialize', initialPayment);

router.get('/verify', verifyPayment);

module.exports = router
