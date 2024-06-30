import Order from '../models/Order';

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
  const orderId = req.params.id;

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
  const { customerId, tableNumber, items, totalAmount } = req.body;

  try {
    const newOrder = await Order.create({
      customer: customerId,
      tableNumber,
      items,
      totalAmount,
      status: 'pending',
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
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
