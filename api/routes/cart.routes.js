// routes/cart.js
import express from 'express';
const cartRouter = express.Router();
import CartItem from '../models/Cart.js';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';

// Add item to cart
cartRouter.post('/add', async (req, res) => {
    const { itemId } = req.body;
    const accessToken = req.cookies.accessToken;

    try {
        // Verify and decode accessToken
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            }

            const userId = decoded.id;

            let cartItem = await CartItem.findOne({ user: userId, item: itemId });

            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cartItem = new CartItem({ user: userId, item: itemId });
            }

            await cartItem.save();

            res.json({ success: true, message: 'Item added to cart successfully.' });
        });
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        res.status(500).json({ success: false, message: 'Failed to add item to cart.' });
    }
});

// Get cart items
cartRouter.get('/', async (req, res) => {
    const accessToken = req.cookies.accessToken;

    try {
        // Verify and decode accessToken
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            }

            const userId = decoded.id;

            const cartItems = await CartItem.find({ user: userId }).populate('item');
            res.json({ success: true, cartItems });
        });
    } catch (error) {
        console.error('Failed to fetch cart items:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch cart items.' });
    }
});

// Update cart item quantity
cartRouter.put('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const accessToken = req.cookies.accessToken;

    try {
        // Verify and decode accessToken
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            }

            const userId = decoded.id;
            console.log(itemId, quantity);

            const cartItem = await CartItem.findOneAndUpdate(
                { user: userId, _id: itemId },
                { quantity },
                { new: true }
            );

            if (!cartItem) {
                return res.status(404).json({ success: false, message: 'Cart item not found.' });
            }

            res.json({ success: true, message: 'Cart item quantity updated successfully.', cartItem });
        });
    } catch (error) {
        console.error('Failed to update cart item quantity:', error);
        res.status(500).json({ success: false, message: 'Failed to update cart item quantity.' });
    }
});

// Remove item from cart
cartRouter.delete('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const accessToken = req.cookies.accessToken;

    try {
        // Verify and decode accessToken
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            }

            const userId = decoded.id;

            const cartItem = await CartItem.findOneAndDelete({ user: userId, _id: itemId });

            if (!cartItem) {
                return res.status(404).json({ success: false, message: 'Cart item not found.' });
            }

            res.json({ success: true, message: 'Cart item removed successfully.' });
        });
    } catch (error) {
        console.error('Failed to remove cart item:', error);
        res.status(500).json({ success: false, message: 'Failed to remove cart item.' });
    }
});

cartRouter.delete('/', async (req, res) => {
    const accessToken = req.cookies.accessToken;

    try {
        // Verify and decode accessToken
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            }

            const userId = decoded.id;

            const cartItem = await CartItem.deleteMany({ user: userId});

            if (!cartItem) {
                return res.status(404).json({ success: false, message: 'Cart item not found.' });
            }

            res.json({ success: true, message: 'Cart item removed successfully.' });
        });
    } catch (error) {
        console.error('Failed to remove cart item:', error);
        res.status(500).json({ success: false, message: 'Failed to remove cart item.' });
    }
});


// Create order
cartRouter.post('/checkout', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { tableNumber } = req.body;

    try {
        // Verify and decode accessToken
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            }

            const userId = decoded.id;

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

            // Create new order
            const newOrder = new Order({
                customer: userId,
                tableNumber,
                items: cartItems.map(item => ({
                    menuItem: item.item._id,
                    quantity: item.quantity
                })),
                totalAmount
            });

            // Save order
            await newOrder.save();

            // Clear cart after order creation
            await CartItem.deleteMany({ user: userId });
            const populatedOrder = await Order.findById(newOrder._id).populate('items.menuItem').populate('customer');

            res.json({ success: true, message: 'Order created successfully.', order: populatedOrder });
        });
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order.' });
    }
});



export default cartRouter;
