import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "./successorder.css";
import { CartContext } from "../../components/context/CartContext";
import { axiosInstance } from "../../config/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ThreeDot } from "react-loading-indicators";
const SuccessOrder = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const user = JSON.parse(Cookies.get("user") || "{}");

  const { setCartitems, cartitems } = useContext(CartContext);

  const totalAmount = cartitems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const hascreated = useRef(false);
  useEffect(() => {
    const { address, email, firstName, secondName, phone } = user;
    setIsLoading(true);
    const createorder = async () => {
      if (hascreated.current) return;
      hascreated.current = true;
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id",
      );
      if (!sessionId) {
        toast.error("Invalid session");
        return;
      }

      if (!email && !address && !firstName && !secondName && !phone) {
        toast.error("User data missing");
        return;
      }

      if (!cartitems.length) {
        toast.error("Cart is empty");
        return;
      }

      try {
        await axiosInstance.post("/order", {
          sessionId,
          address,
          email,
          firstName,
          secondName,
          phone,
          status: "completed",
          totalAmount,
          items: cartitems,
        });
        toast.success("Order created successfully");

        setCartitems([]);
        localStorage.removeItem("productsincart");
      } catch (e) {
        toast.error(e.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    createorder();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center ">
        <ThreeDot variant="pulsate" color="#e1a10b" size="medium" />
      </div>
    );
  }

  return (
    <div className="success">
      <div className="container">
        <div className="card">
          <div className="icon">✔</div>

          <h1>Order Confirmed!</h1>

          <p>
            Thank you for your purchase. Your order has been successfully placed
            and will be processed soon.
          </p>

          <button
            className="btn_products"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

          <button className="btn_orders" onClick={() => navigate("/orders")}>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
