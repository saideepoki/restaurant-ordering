import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any>([]);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await axios.get('/cart');
                if (response.data.success) {
                    setCartItems(response.data.cartItems);
                } else {
                    toast({
                        title: 'Failed to fetch cart items',
                        description: response.data.message,
                        variant: 'destructive',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
                toast({
                    title: 'Failed to fetch cart items',
                    description: 'An error occurred while fetching cart items.',
                    variant: 'destructive',
                });
            }
        }

        fetchCartItems();
    }, [toast]);

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const response = await axios.put(`/cart/${itemId}`, { quantity: newQuantity });
            if (response.data.success) {
                const updatedCartItems = cartItems.map(item =>
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                );
                setCartItems(updatedCartItems);
            } else {
                toast({
                    title: 'Failed to update quantity',
                    description: response.data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
            toast({
                title: 'Failed to update quantity',
                description: 'An error occurred while updating quantity.',
                variant: 'destructive',
            });
        }
    };

    const handleIncrement = async (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
        await handleQuantityChange(itemId, updatedCartItems.find(item => item._id === itemId).quantity);
    };

    const handleDecrement = async (itemId) => {
        const updatedCartItems = cartItems.map(item =>
            item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCartItems);
        await handleQuantityChange(itemId, updatedCartItems.find(item => item._id === itemId).quantity);
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await axios.delete(`/cart/${itemId}`);
            if (response.data.success) {
                const updatedCartItems = cartItems.filter(item => item._id !== itemId);
                setCartItems(updatedCartItems);
                toast({
                    title: 'Item removed',
                    description: 'Item removed from cart successfully.',
                    variant: 'default',
                });
            } else {
                toast({
                    title: 'Failed to remove item',
                    description: response.data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            toast({
                title: 'Failed to remove item',
                description: 'An error occurred while removing item from cart.',
                variant: 'destructive',
            });
        }
    };

    const handleClearCart = async () => {
        try {
            const response = await axios.delete('/cart');
            if (response.data.success) {
                setCartItems([]);
                toast({
                    title: 'Cart cleared',
                    description: 'Cart cleared successfully.',
                    variant: 'default',
                });
            } else {
                toast({
                    title: 'Failed to clear cart',
                    description: response.data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
            toast({
                title: 'Failed to clear cart',
                description: 'An error occurred while clearing cart.',
                variant: 'destructive',
            });
        }
    };

    const handleProceedToCheckout = async () => {
      try {
          const response = await axios.post('/cart/checkout', { tableNumber: 5 }); // Replace with actual table number
          if (response.data.success) {
              // Redirect to order confirmation page with order details
              navigate('/order-confirmation', { state: { order: response.data.order } });
          } else {
              toast({
                  title: 'Failed to create order',
                  description: response.data.message,
                  variant: 'destructive',
              });
          }
      } catch (error) {
          console.error('Failed to proceed to checkout:', error);
          toast({
              title: 'Failed to proceed to checkout',
              description: 'An error occurred while proceeding to checkout.',
              variant: 'destructive',
          });
      }
  };


    return (
        <div className="cart-page p-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map(cartItem => (
                        <div key={cartItem._id} className="cart-item mb-4 p-4 bg-white rounded shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={cartItem.item.imageUrl} alt={cartItem.item.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold">{cartItem.item.name}</h2>
                                        <p className="text-sm text-gray-600">{cartItem.item.description}</p>
                                        <p className="text-lg font-bold mt-2">₹{cartItem.item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleDecrement(cartItem._id)}
                                        className="bg-gray-300 text-gray-600 px-3 py-1 rounded-l hover:bg-gray-400"
                                    >
                                        -
                                    </button>
                                    <span className="px-3">{cartItem.quantity}</span>
                                    <button
                                        onClick={() => handleIncrement(cartItem._id)}
                                        className="bg-gray-300 text-gray-600 px-3 py-1 rounded-r hover:bg-gray-400"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleRemoveItem(cartItem._id)}
                                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleClearCart}
                            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleProceedToCheckout}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
