import { useContext, useEffect, useState } from "react";
import "./productDetails.css";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import toast from "react-hot-toast";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import ProductdetailsLoading from "./ProductdetailsLoading";
import { CartContext } from "../context/CartContext";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setloading] = useState(true);
  const [indexcolor, setIndexcolor] = useState(0);
  const [indexsize, setIndexSize] = useState(0);

  const { addToCart, cartitems, handledecreasebutton, handleincreasebutton } =
    useContext(CartContext);

  const productFound = cartitems.find((p) => p.id === id);
  useEffect(() => {
    const getproduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/get-product?id=${id}`,
        );
        const item = response.data;
        setProduct(item);
        setloading(false);
      } catch (e) {
        toast.error(e.response?.data || e.message);
      }
    };
    getproduct();
  }, [id]);


  return (
    <>
      {loading ? (
        <ProductdetailsLoading />
      ) : (
        <div className="product_details">
          <img className="first_image" src="../../../imgs/pill-shape.png" />

          <div className="container" data-aos="fade-up">
            <img className="main-image" src={product.imageUrl} alt="image" />
            <div className="slider">
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                navigation={{
                  nextEl: ".next-swiper-btn",
                  prevEl: ".prev-swiper-btn",
                }}
                modules={[Navigation, Mousewheel, Keyboard]}
                className="mySwiper relative"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
              >
                {product.productImages.map((obj) => (
                  <SwiperSlide key={obj.id}>
                    <div className="image_slider">
                      <img src={obj.imageUrl} alt="image" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="prev-swiper-btn">
                {" "}
                <FaArrowLeft />{" "}
              </button>
              <button className="next-swiper-btn">
                {" "}
                <FaArrowRight />{" "}
              </button>
            </div>
            <div className="all_desc">
              <div className="info">
                <h1>{product.productCategory}</h1>
                <h2>{product.name}</h2>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                {product.hasDiscount && (
                  <p className="discount_price">
                    Before discount: <span>${product.price}</span>
                  </p>
                )}
                <p className="price">
                  price: <span>${product.price}</span>
                </p>
              </div>
              <div className="more_info">
                <h1>Colors</h1>
                <div className="variants">
                  {product.variants.map((i, index) => (
                    <span
                      className={indexcolor === index ? "active" : ""}
                      onClick={() => {
                        setIndexcolor(index);
                      }}
                      key={i.id}
                    >
                      {i.color}
                    </span>
                  ))}
                </div>
                <h2>Available Sizes</h2>
                <div className="sizes">
                  {product.variants?.[indexcolor].sizes.map((i, index) => (
                    <span
                      className={indexsize === index ? "active" : ""}
                      onClick={() => {
                        setIndexSize(index);
                      }}
                      key={index}
                    >
                      {i.size}
                    </span>
                  ))}
                </div>

                {productFound ? (
                  <div className="quantity">
                    <button onClick={() => handleincreasebutton(product)}>
                      +
                    </button>
                    <span>{productFound.quantity || 0}</span>
                    <button onClick={() => handledecreasebutton(product)}>
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      addToCart({
                        ...product,
                        color: product.variants?.[indexcolor].color,
                        size: product.variants?.[indexcolor].sizes[indexsize]
                          .size,
                      });
                    }}
                    className="btn_add_to_cart"
                  >
                    add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
