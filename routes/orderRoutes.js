const express = require('express');
const router = express.Router();
const { placeOrder, getOrderHistory } = require('../controller/order');

router.post('/place-order', placeOrder);
router.get('/history', getOrderHistory);

module.exports = router;