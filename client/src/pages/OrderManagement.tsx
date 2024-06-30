
import { useState, useEffect } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("/order/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }
    fetchOrders();
  }, []);

  const handleMarkAsCompleted = async (orderId) => {
    try {
      const response = await axios.put(`/order/${orderId}`, {
        status: "completed",
      });
      if (response.data.message === "Order status updated successfully") {
        // Update orders state or fetch orders again to reflect the change
      } else {
        console.error(
          "Failed to mark order as completed:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Failed to mark order as completed:", error);
    }
  };

  return (
    <div>
      <h1>Incoming Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <div>
              <p>Table Number: {order.tableNumber}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    <p>
                      {item.menuItem.name} - Quantity: {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleMarkAsCompleted(order._id)}>
                Mark as Completed
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
