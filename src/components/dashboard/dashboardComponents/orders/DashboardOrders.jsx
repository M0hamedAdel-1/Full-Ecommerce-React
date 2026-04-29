import React, { useEffect, useState } from "react";
import "./orders.css";
import HeadingComponent from "../../headingcomponent/HeadingComponent";
import SearchComponents from "../../SearchComponents";
import { FiRefreshCw } from "react-icons/fi";
import TableComponent from "../../TableComponent";
import { axiosInstance } from "../../../../config/axios";
import toast from "react-hot-toast";
import { OrbitProgress } from "react-loading-indicators";
import Pagination from "../../Pagination ";
import OrderDetails from "../../orderdetails/OrderDetails";
const DashboardOrders = () => {
  const [search, setSearch] = useState("");
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);

  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const headers = [
    {
      label: "#",
      render: (row, i, pageIndex) => (pageIndex - 1) * 10 + i + 1,
    },
    {
      label: "Name",
      render: (row) => `${row.firstName} ${row.secondName}`,
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Total Amount",
      render: (row) => `$${row.totalAmount}`,
    },
    {
      label: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      label: "Actions",
      render: (order) => (
        <div>
          <span className="view" onClick={() => handleView(order.id)}>
            View
          </span>

          <span className={`status ${order.status?.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
      ),
    },
  ];

  const handleView = (id) => {
    const selectedOrder = orders.find((o) => o.id === id);
    setSelectedOrder(selectedOrder);
  };

  const getOrders = async () => {
    try {
      setloading(true);
      const response = await axiosInstance.get(
        `/orders?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      );
      setorders(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      const message =
        e.response?.data?.error?.message ||
        e.response?.data?.message ||
        e.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, [pageIndex]);
  const click_refresh = () => {
    getOrders();
  };

  const keyword = (search || "").toLowerCase();

  const filteredOrders = orders.filter((o) =>
    `${o.firstName || ""} ${o.secondName || ""} ${o.address || ""} ${o.email || ""} ${o.phone || ""} ${new Date(o.createdAt).toLocaleString()}`
      .toLowerCase()
      .includes(keyword),
  );
  return (
    <div className="dashboard_orders">
      <HeadingComponent
        heading="orders"
        Icon={FiRefreshCw}
        click_arrow={click_refresh}
        loading={loading}
      />
      <div>
        <SearchComponents
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        {loading ? (
          <div className="load_center">
            <OrbitProgress color="#eaf737" size="medium" text="" textColor="" />
          </div>
        ) : (
          <div className="table_content">
            <TableComponent
              headers={headers}
              rows={search ? filteredOrders : orders}
              pageIndex={pageIndex}
            />
            <Pagination
              pageIndex={pageIndex}
              totalPages={totalPages}
              setPageIndex={setPageIndex}
            />
          </div>
        )}
      </div>
      <div className="order_details">
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onclose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardOrders;
