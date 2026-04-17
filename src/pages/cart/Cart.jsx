import { useContext, useState } from "react";
import "./cart.css";
import { MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";
import ProductinCart from "../../components/productinCart/ProductinCart";
import { axiosInstance } from "../../config/axios";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Cart = () => {
  const [disabled, setdiabled] = useState(false);
  const { cartitems } = useContext(CartContext);

  const totalPrice = cartitems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handlecheckout = async () => {
    try {
      setdiabled(true);
      const stripe = await stripePromise;
      const response = await axiosInstance.post(`/checkout`, {
        items: cartitems,
        baseUrl: location.origin,
      });

      const sessionId = response.data.sessionId;
      await stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (e) {
      toast.error(e.error || "something went wrong");
    } finally {
      setdiabled(false);
    }
  };

  return (
    <div className="cart">
      <img className="one_img" src="../../../imgs/pill-shape.png" />
      <div className="container" data-aos="fade-up">
        <h1>
          Cart <MdShoppingBasket />{" "}
        </h1>
        {cartitems.length === 0 ? (
          <div className="empty_cart">
            <h2>Your Cart is Empty</h2>
            <Link to="/products">Browse products</Link>
          </div>
        ) : (
          <div>
            <div className="products">
              {cartitems.map((item) => (
                <ProductinCart key={item.id} item={item} />
              ))}
            </div>

            <div className="check_out">
              <h2>Total Price</h2>
              <p>${totalPrice.toFixed(2)}</p>
              <button disabled={disabled} onClick={handlecheckout}>
                Process To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
