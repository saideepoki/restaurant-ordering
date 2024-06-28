import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import OrderDetails from "../pages/OrderDetails";
import StaffLogin from "../pages/StaffLogin";
import StaffOrders from "../pages/StaffOrders";
import Error from "../pages/Error";
import NavBar from './NavBar';
import Signup from "../pages/Signup";
import Login from "../pages/Login";

export default function Router() {
  return (
    <BrowserRouter>
        <NavBar/>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        {/* Staff Routes */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/orders" element={<StaffOrders />} />

        {/* 404 Not Found */}
        <Route element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
