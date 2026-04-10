import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import "./products.css";
import Emptycomponent from "../../components/empty/Emptycomponent";
import { axiosInstance } from "../../config/axios";
import toast from "react-hot-toast";
import ProductsLoading from "./ProductsLoading";
const Products = () => {
  const [productarr, setProductarr] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [loadingPorducts, setLoadingPorducts] = useState(true);
  const [allpages, setallpages] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/get-all-products?pageIndex=${pageIndex}&pageSize=12`,
        );

        setProductarr(response.data.data);
        setallpages(response.data.totalPages);
        setLoadingPorducts(false);
      } catch (e) {
        console.log("From Cathch", e.message);
        toast.error(e.message);
      }
    };
    getProducts();
  }, [pageIndex]);

  const prevfunction = () => {
    if (pageIndex > 1) {
      setLoadingPorducts(true);
      setPageIndex(pageIndex - 1);
    }
  };
  const nextfunction = () => {
    setLoadingPorducts(true);
    if(pageIndex<allpages){
      setPageIndex(pageIndex + 1);
    }
  };

  useEffect(() => {
    // console.log("ProductsArray", productarr);
  }, [productarr]);

  return (
    <>
      {loadingPorducts ? (
        <ProductsLoading />
      ) : (
        <div className="products">
          <div className="container" data-aos="fade-up">
            <h1>Our products</h1>
            <div className="all_products  grid grid-cols-1 gap-4 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productarr.map((item) => (
                <Product key={item.id} item={item} />
              ))}
            </div>
            <div className="btn-prev-next">
              <button
                onClick={prevfunction}
                className={`prev ${pageIndex === 1 ? "disable" : ""}`}
              >
                prev
              </button>
              <p>
                {pageIndex} of {allpages}
              </p>
              <button onClick={nextfunction} className={`next ${pageIndex === allpages?"disable":""} `}>
                next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
