import {Router} from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { getAllOrders} from '../controllers/orderController';
import { getOrderById } from '../controllers/orderController';
import { createOrder } from '../controllers/orderController';
import { updateOrderStatus } from '../controllers/orderController';


const orderRouter = Router();


// GET all orders (for staff)
orderRouter.get('/', authenticateToken, getAllOrders);

// GET order by ID (for staff)
orderRouter.get('/:id', authenticateToken, getOrderById);

// POST create new order (for customers)
orderRouter.post('/', createOrder);

// PUT update order status (for staff)
orderRouter.put('/:id', authenticateToken, updateOrderStatus);

export default orderRouter;