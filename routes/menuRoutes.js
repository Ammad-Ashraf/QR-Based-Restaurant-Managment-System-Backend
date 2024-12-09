const express = require('express');
const router = express.Router();
const { getAllMenuItems } = require('../controller/menu');

// Get all menu items
router.get('/', getAllMenuItems);

module.exports = router;