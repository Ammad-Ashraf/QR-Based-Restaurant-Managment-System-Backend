const Order = require('../models/Orders');

exports.placeOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Populate the menuItem references with name and price
    await order.populate('items.menuItem', 'name price');
    
    // Create a response object with item details
    const responseOrder = order.toObject();
    responseOrder.items = responseOrder.items.map(item => ({
      ...item,
      name: item.menuItem.name,
      price: item.menuItem.price
    }));

    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully', 
      data: responseOrder 
    });
  } catch (error) {
    next(new Error('Error placing order: ' + error.message));
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const { contact } = req.query;
    if (!contact) {
      return res.status(400).json({ success: false, message: 'Contact number is required' });
    }
    const orders = await Order.find({ 'customerDetails.contact': contact }).sort('-createdAt');
    if (!orders.length) {
      return res.status(404).json({ success: false, message: 'No order history found' });
    }
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(new Error('Error fetching order history: ' + error.message));
  }
};