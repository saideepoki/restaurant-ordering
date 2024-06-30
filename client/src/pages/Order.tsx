import { useLocation } from 'react-router-dom';

export default function OrderConfirmationPage() {
    const location = useLocation();
    const { order } = location.state || {};
    console.log(order);
    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-confirmation-page p-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-8">Order Confirmation</h1>
            <div className="order-details bg-white p-4 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Table Number:</strong> {order.tableNumber}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <h3 className="text-xl font-bold mt-4">Items</h3>
                {order.items.map(item => (
                    <div key={item._id} className="order-item mb-2">
                        <p><strong>{item.menuItem.name}</strong> x {item.quantity}</p>
                        <p>{item.menuItem.description}</p>
                        <p>₹{item.menuItem.price}</p>
                    </div>
                ))}
                <p className="text-xl font-bold mt-4">Total Amount: ₹{order.totalAmount}</p>
            </div>
        </div>
    );
}
