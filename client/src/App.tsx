import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyUser";
import Menu from "./pages/Menu";
import Cart from './pages/Cart';
import Order from './pages/Order';
import StaffLogin from "./pages/StaffLogin";
import StaffRegister from "./pages/StaffRegister";
import Error from "./pages/Error";
import NavBar from "./components/NavBar";
import OrderManagement from './pages/OrderManagement';
import axios from "axios";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./components/AuthProvider";

axios.defaults.baseURL = 'https://restaurant-ordering-1.onrender.com'
axios.defaults.withCredentials = true;
function App() {
  const location = useLocation();
  const showNavBar = !["/sign-in", "/sign-up", "/staff/login", "/staff/register"].includes(location.pathname)
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
        <Route path="/order-confirmation" element={<Order />} />

        {/* Staff Routes */}
        <Route path="/staff/register" element={<StaffRegister />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/orders" element={<OrderManagement/>} />

        {/* 404 Not Found */}
        <Route element={<Error />} />
      </Routes>
      <Toaster/>
    </AuthProvider>
  )
}

export default App
