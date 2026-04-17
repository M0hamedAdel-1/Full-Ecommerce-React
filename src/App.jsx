import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/products/Products";
import Favorites from "./pages/favorites/Favorites";
import Orders from "./pages/orders/Orders";
import Contact from "./pages/contact/Contact";
import Cart from "./pages/cart/Cart";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/productdetails/ProductDetails";
import Verification from "./components/otbverification/Verification";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./route/ProtectedRoute";
import "aos/dist/aos.css";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ErrorElement from "./components/ErrorElement/ErrorElement";
import Erorrcomponent from "./components/Erorrcomponent";
import Profile from "./pages/profile/Profile";
import SuccessOrder from "./pages/successOrder/SuccessOrder";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import OTPForm from "./pages/ForgetPassword/OTPForm";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Toaster
        toasterId="bottom-right"
        position="bottom-right"
        reverseOrder={false}
      />
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoute/>} errorElement={<ErrorElement/>} >
          <Route element={<AppLayout />}>
        
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/success" element={<SuccessOrder/>} />
          </Route>
        </Route>

        <Route element={<AuthLayout />} errorElement={<ErrorElement/>}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<OTPForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
