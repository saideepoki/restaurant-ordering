import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import StaffLogin from "./pages/StaffLogin";
import StaffOrders from "./pages/StaffOrders";
import Error from "./pages/Error";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();
  const showNavBar = !["/sign-in", "/sign-up"].includes(location.pathname)
  return (
    <>
    {showNavBar && <NavBar/>}
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
    </>
  )
}

export default App
