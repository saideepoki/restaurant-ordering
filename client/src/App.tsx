import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyUser";
import Menu from "./pages/Menu";
import Cart from './pages/Cart';
import OrderDetails from "./pages/OrderDetails";
import StaffLogin from "./pages/StaffLogin";
import StaffOrders from "./pages/StaffOrders";
import Error from "./pages/Error";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./components/AuthProvider";

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;
function App() {
  const location = useLocation();
  const showNavBar = !["/sign-in", "/sign-up"].includes(location.pathname)
  return (
    <AuthProvider>
    {showNavBar && <NavBar/>}
    <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/verify/:email" element={<VerifyOtp />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        {/* Staff Routes */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/orders" element={<StaffOrders />} />

        {/* 404 Not Found */}
        <Route element={<Error />} />
      </Routes>
      <Toaster/>
    </AuthProvider>
  )
}

export default App
