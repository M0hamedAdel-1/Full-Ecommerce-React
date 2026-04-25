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
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedDashboard from "./route/ProtectedDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardProducts from "./components/dashboard/dashboardComponents/products/DashboardProducts";
import Categories from "./components/dashboard/dashboardComponents/categories/Categories";
import DashboardOrders from "./components/dashboard/dashboardComponents/orders/DashboardOrders";
import Users from "./components/dashboard/dashboardComponents/users/Users";
import AddNewProduct from "./components/dashboard/dashboardComponents/products/AddNewProduct";
import AddCategory from "./components/dashboard/dashboardComponents/categories/AddCategory";
import ShowImages from "./components/dashboard/dashboardComponents/products/ShowImages";
import AddNewImages from "./components/dashboard/dashboardComponents/products/AddNewImages";
import EditCategory from "./components/dashboard/dashboardComponents/categories/EditCategory";
import EditProduct from "./components/dashboard/dashboardComponents/products/EditProduct";
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
            <Route path="*" element={<Erorrcomponent/>} />
            
          </Route>
        </Route>

        <Route element={<AuthLayout />} errorElement={<ErrorElement/>}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<OTPForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />
        </Route>

        <Route element={<ProtectedDashboard/>}>
            <Route element={<DashboardLayout/>} path="/admin">
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="products" element={<DashboardProducts/>}/>
                  <Route path="products/add" element={<AddNewProduct/>}/>
                  <Route path="products/edit-product/:id" element={<EditProduct/>}/>
                    <Route path="products/images/:id" element={<ShowImages/>}/>
                        <Route path="products/images/:id/add" element={<AddNewImages/>}/>


                <Route path="categories" element={<Categories/>}/>
                <Route path="categories/addCategory" element={<AddCategory/>}/>
                <Route path="categories/edit/:id" element={<EditCategory/>}/>
                <Route path="orders" element={<DashboardOrders/>}/>
                <Route path="users" element={<Users/>}/>
            </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
