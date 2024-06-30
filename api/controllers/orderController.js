import Order from '../models/Order.js';
import CartItem from '../models/Cart.js';

// GET all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('items.menuItem');  
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// GET order by ID
export const getOrderById = async (req, res) => {
  const orderId = req.params._id;

  try {
    const order = await Order.findById(orderId).populate('customer').populate('items.menuItem');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// POST create new order
export const createOrder = async (req, res) => {
  const { tableNumber } = req.body;
  const userId = req.user._id; // Assuming req.user is set by authenticateToken middleware

  try {
      // Fetch cart items for the user
      const cartItems = await CartItem.find({ user: userId }).populate('item');

      if (!cartItems || cartItems.length === 0) {
          return res.status(400).json({ success: false, message: 'No items in the cart.' });
      }

      // Calculate total amount
      let totalAmount = 0;
      cartItems.forEach(item => {
          totalAmount += item.quantity * item.item.price;
      });

      // Create new order instance
      const newOrder = new Order({
          customer: userId,
          tableNumber,
          items: cartItems.map(item => ({
              menuItem: item.item._id,
              quantity: item.quantity
          })),
          totalAmount
      });

      // Save order to the database
      await newOrder.save();

      // Clear cart after order creation
      await CartItem.deleteMany({ user: userId });

      res.json({ success: true, message: 'Order created successfully.', order: newOrder });
  } catch (error) {
      console.error('Failed to create order:', error);
      res.status(500).json({ success: false, message: 'Failed to create order.' });
  }
};

// PUT update order status
export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
