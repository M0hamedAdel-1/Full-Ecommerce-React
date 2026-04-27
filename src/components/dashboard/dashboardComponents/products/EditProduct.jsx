import React, { useEffect, useState } from "react";
import { FaArrowRightLong, FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import HeadingComponent from "../../headingcomponent/HeadingComponent";
import InputFile from "../../inputs/InputFile";
import InputSelectOptions from "../../inputs/InputSelectOptions";
import EditorInput from "../../inputs/EditorInput";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../../../../config/axios";
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

const EditProduct = () => {
  const [categories, setcategories] = useState([]);
  const [, setloading] = useState(false);
  const [ preview,setpreview] = useState(false)
  const [isloading,setisloading] = useState(false)
  const [showPreview, setShowPreview] = useState(false);

  const { id } = useParams();
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
  if (type === "file" && files && files.length > 0) {
    const file = files[0];

    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
    const previewimge= URL.createObjectURL(file)
    setpreview(previewimge);
    
  } else {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
useEffect(()=>{
  return ()=>{
    if(preview){
      URL.revokeObjectURL(preview)
    }
  }
},[preview])


  useEffect(() => {
    const getCategories = async () => {
      setloading(true);
      try {
        const response = await axiosInstance.get(
          "/category/get-all-categories",
        );

        setcategories(response.data);
      } catch (error) {
        toast.error(error.message, "Failed to load categories");
      } finally {
        setloading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      setloading(true);
      try {
        const response = await axiosInstance.get(
          `/product/get-product?id=${id}`,
        );
        const data = response.data;

const price = Number(data.price || 0);
const priceBeforeDiscount = Number(data.priceBeforeDiscount || 0);

setProduct({
  ...data,
  discount:
    data.hasDiscount && priceBeforeDiscount > price
      ? priceBeforeDiscount - price
      : "",
});
        setpreview(response.data.imageUrl);

      } catch (error) {
        toast.error(error.message, "Failed to load categories");
      } finally {
        setloading(false);
      }
    };

    getProduct();
  }, [id]);
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
  const handleAddSize =(idx)=>{
    const productVariants = [...product.variants];

    const productsize = productVariants[idx].sizes

    productsize.push({size: '', quantity: ''})
 setProduct({ ...product, variants: productVariants });
    
  
}
const handledeletesize =(idx,sizeIndex)=>{
      const productVariants = [...product.variants];
      const uppdatevariants = productVariants.map((variant,i)=>{
        if(i === idx){
          return{
            ...variant,
            sizes:variant.sizes.filter((size,index)=>index !== sizeIndex)
          }
        }
        return variant
      })
      
      
      setProduct({...product,variants:uppdatevariants})
  
}
useEffect(() => {
  if (!product.hasDiscount) {
    setProduct((prev) => ({
      ...prev,
      discount: "",
    }));
  }
}, [product.hasDiscount]);
const handlesubmit = async (e) => {
  e.preventDefault();


  
  
  

  try {
const price = Number(product.price || 0);
const discount = product.hasDiscount
  ? Number(product.discount || 0)
  : 0;

const priceBeforeDiscount = price + discount;


    setisloading(true)
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("id",id)
    formData.append("price", price);
    formData.append("description", product.description);
    formData.append("discount",discount);
    formData.append("hasDiscount",product.hasDiscount);
    formData.append("productCategory",product.productCategory);
    formData.append("productCategoryId", product.productCategoryId);
    formData.append("imageUrl", product.imageUrl);
    formData.append("priceBeforeDiscount", priceBeforeDiscount);
    formData.append("image", product.image);
    formData.append("variantsDto", JSON.stringify(product.variants));

    // image (only if new file)
    if (product.image instanceof File) {
      formData.append("image", product.image);
    }

    const response = await axiosInstance.put(
      "/product/update-product",
      formData,
      {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
    );
    
    if (response.status === 200) {
      toast.success("Product updated successfully");

      navigate("/admin/products");
      
    }

  } catch (err) {
    toast.error(err.message,"Error updating product");
  }finally{
    setisloading(false)
  }
};
  return (
    <div className="add_new_product">

      <HeadingComponent
        heading={"edit Product"}
        Icon={FaArrowRightLong}
        click_arrow={handleArrow}
      />
      <form onSubmit={handlesubmit} className="form">
        <div className="all_inputs">
          <div className="box">

          <InputFile
            name="image"
            onChange={handleChange}
            label="Choose image"
            type="file"
            />
            <div className="image_box">
                  <h3>image</h3>
                  <div className="icons" >
                    <div className="icon-eye" onClick={()=>setShowPreview(!showPreview)}>
                    <BsEye/>
                    </div>
                  </div>
            </div>
          </div>
          <InputFile
            name="name"
            onChange={handleChange}
            label="Product Name"
            type="text"
            value={product.name}
          />
          <InputSelectOptions
            name="productCategory"
            onChange={handleChange}
            label="choose Category"
            options={categories}
            value={product.productCategory}
          />
          <InputFile
            name="price"
            onChange={handleChange}
            label="Product Price"
            type="number"
            value={product.price}
          />
          <InputSelectOptions
            name="hasDiscount"
            onChange={(e) =>
              setProduct({ ...product, hasDiscount: e.target.value === "true" })
            }
            label="has Discount"
            options={[
              { name: "true" },
              { name: "false" },
            ]}
            value={product.hasDiscount}
          />
          {product.hasDiscount && (
            <InputFile
              name="discount"
              onChange={handleChange}
              label="Product Discount"
              type="number"
              value={product.discount || ""}
            />
          )}
        </div>
        <div className="editor_input_container">
          <EditorInput
            name="description"
            onChange={(value) => {
              setProduct((prev) => ({ ...prev, description: value }));
            }}
            value={product.description}
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

            <div className="cards">
              {product.variants.map((el, idx) => {
                const currentSize = el.sizes;
                return (
                  <div className="color_card" key={idx}>
                    <div className="color_name">
                      <InputFile
                        type="text"
                        label="Color Name"
                        value={el.color}
                        onChange={(e) => handleColorChange(e, idx)}
                      />
                      <div className="icon">
                        <MdDelete />
                      </div>
                    </div>
                    <div className="quantity_container">
                      {currentSize.map((size, sizeIndex) => {
                        return (
                          <div className="quantity_size" key={sizeIndex}>
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
                              value={size.size}
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
                              value={size.quantity}
                            />
                            <div
                              className="icon"
                              onClick={() => handledeletesize(idx, sizeIndex)}
                            >
                              <MdDelete />
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => handleAddSize(idx)}
                        className="add_size"
                      >
                        add size
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="add_product">
          <button disabled={isloading} type="submit" className="add_product_btn">
            update  product
          </button>
        </div>
      </form>

      {showPreview && (
  <div className="show_image" onClick={() => setShowPreview(false)}>
    
    <div className="box_of_image" onClick={(e) => e.stopPropagation()}>
      
      <GrClose
        className="close_image"
        onClick={()=>setShowPreview(false)}
      />

      <img
        src={preview}
        alt="preview"
        className="image_preview"
      />
    </div>

  </div>
)}

    </div>
  );
};

export default EditProduct;
