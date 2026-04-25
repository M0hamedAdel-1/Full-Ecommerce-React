import React, { useState } from "react";
import HeadingComponent from "../../headingcomponent/HeadingComponent";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputFile from "../../inputs/InputFile";
import InputSelectOptions from "../../inputs/InputSelectOptions";
import EditorInput from "../../inputs/EditorInput";
import ProductColorInput from "../../inputs/ProductColorInput";
import { axiosInstance } from "../../../../config/axios";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const navigate = useNavigate();
  const handleArrow = () => {
    navigate("/admin/products");
  };

  const [product, setProduct] = useState({
    image: null,
    name: "",
    price: "",
    productCategory: "",
    hasDiscount: false,
    discount: "",
    description: "",
    variants: [
      {
        color: "",
        sizes: [{ size: "", quantity: "" }],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log({ name, value, files, type });

    setProduct((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      priceBeforeDiscount: +product.price + +product.discount,
      variantsDto: JSON.stringify(product.variants),
      productCategoryId: "69d0dc7655c0475bd95665e9",
    };


    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      console.log(key, value);
      formData.append(key, value);
    });

    try {
      const response = await axiosInstance.post(
        "/product/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        toast.success("product added successfully");
        navigate("/admin/products");
      }
    } catch (err) {
      toast.error(err.message || "error adding product");
    }
  };

  function addNewColorBox() {
    const colorBoxData = {
      color: "",
      sizes: [{ size: "", quantity: "" }],
    };

    setProduct((prev) => {
      return { ...prev, variants: [...prev.variants, colorBoxData] };
    });
  }

  const handleColorChange = (e, idx) => {
    const productVariants = [...product.variants];
    const currentVariant = productVariants[idx];
    currentVariant.color = e.target.value;
    setProduct({ ...product, variants: productVariants });
  };

  const onSizeAndQuantityChange = (payload, sizeIndex, variantIndex) => {
    const productVariants = [...product.variants];
    const currentVariant = productVariants[variantIndex];
    const currentSize = currentVariant.sizes[sizeIndex];

    const { size, quantity } = payload;

    if (size) currentSize.size = size;

    if (quantity) currentSize.quantity = quantity;

    setProduct({ ...product, variants: productVariants });
  };

  return (
    <div className="add_new_product">
      <HeadingComponent
        heading={"Add Product"}
        Icon={FaArrowRightLong}
        click_arrow={handleArrow}
      />
      <form onSubmit={handlesubmit} className="form">
        <div className="all_inputs">
          <InputFile
            name="image"
            onChange={handleChange}
            label="Choose image"
            type="file"
          />
          <InputFile
            name="name"
            onChange={handleChange}
            label="Product Name"
            type="text"
          />
          <InputSelectOptions
            name="productCategory"
            onChange={handleChange}
            label="choose Category"
            optionone="Nike"
            optiontwo="Croocs"
            optionthree="Shirts"
            optionfour="Bags"
          />
          <InputFile
            name="price"
            onChange={handleChange}
            label="Product Price"
            type="text"
          />
          <InputSelectOptions
            name="hasDiscount"
            onChange={(e) =>
              setProduct({ ...product, hasDiscount: e.target.value === "true" })
            }
            label="has Discount"
            optionone="true"
            optiontwo="false"
          />
          {product.hasDiscount && (
            <InputFile
              name="discount"
              onChange={handleChange}
              label="Product Discount"
              type="text"
            />
          )}
        </div>
        <div className="editor_input_container">
          <EditorInput
            name="description"
            onChange={(value) => {
              setProduct((prev) => ({ ...prev, description: value }));
            }}
          />
        </div>

        <div className="product_colors">
          <div className="product-colors-container">
            <div className="header">
              <h2>Product Colors:</h2>
              <button
                className="add-color-btn"
                type="button"
                onClick={addNewColorBox}
              >
                <span>
                  <FaPlus />
                </span>
              </button>
            </div>

            {product.variants.map((el, idx) => {
              const currentSize = el.sizes;
              return (
                <div className="color_card">
                  <div className="color_name">
                    <InputFile
                      type="text"
                      label="Color Name"
                      onChange={(e) => handleColorChange(e, idx)}
                    />
                    <div className="icon">
                      <MdDelete />
                    </div>
                  </div>
                  {currentSize.map((size, sizeIndex) => {
                    return (
                      <div className="quantity_size">
                        <InputFile
                          onChange={(e) =>
                            onSizeAndQuantityChange(
                              { size: e.target.value },
                              sizeIndex,
                              idx,
                            )
                          }
                          type="number"
                          label="size"
                        />
                        <InputFile
                          type="number"
                          label="quantity"
                          onChange={(e) =>
                            onSizeAndQuantityChange(
                              { quantity: e.target.value },
                              sizeIndex,
                              idx,
                            )
                          }
                        />
                        <div className="icon">
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="add_product">
          <button type="submit" className="add_product_btn">
            add product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
