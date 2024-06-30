import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = Router();

// GET all orders (for staff)
orderRouter.get('/orders', getAllOrders);

// GET order by ID (for staff)
orderRouter.get('/:id', getOrderById);

// POST create new order (for customers)
orderRouter.post('/', createOrder);

// PUT update order status (for staff)
orderRouter.put('/:id', updateOrderStatus);

export default orderRouter;
