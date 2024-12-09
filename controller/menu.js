const MenuItem = require('../models/MenuItem');

const getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true });
    
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'No menu items found' 
      });
    }

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    next(new Error('Error fetching menu items: ' + error.message));
  }
};

module.exports = {
  getAllMenuItems
};