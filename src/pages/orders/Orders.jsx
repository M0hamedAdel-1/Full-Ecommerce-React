import React, { useEffect, useState } from "react";
import "./orders.css";
import { FaRecordVinyl } from "react-icons/fa6";
import Emptycomponent from "../../components/empty/Emptycomponent";
import Order from "./Order";
import { axiosInstance } from "../../config/axios";
import { useAuth } from "../../components/context/Auth";
import OrdersLoading from "./ordersLoading";
import toast from "react-hot-toast";
const Orders = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setorders] = useState([]);
  useEffect(() => {
    if (!user?.email) return;

    const getOrders = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(`/order?email=${user.email}`);
        setorders(response.data);
      } catch (e) {
        const message =
          e.response?.data?.error?.message ||
          e.response?.data?.message ||
          e.message ||
          "Something went wrong";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, [user?.email]);

  if (isLoading) return <OrdersLoading />;

  return (
    <div className="orders">
      <img className="main_img" src="../../../imgs/pill-shape.png" />
      <div className="container" data-aos="fade-up">
        <h1 className="heading" data-aos="fade-up">
          Orders <FaRecordVinyl />
        </h1>
        {orders?.length === 0 && (
          <Emptycomponent
            heading1="No Orders Yet"
            paragraph="Your ordered items will appear here"
          />
        )}
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
