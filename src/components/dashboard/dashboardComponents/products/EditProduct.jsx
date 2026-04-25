import React, { useState } from 'react'
import { FaArrowRightLong, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import HeadingComponent from '../../headingcomponent/HeadingComponent';
import InputFile from '../../inputs/InputFile';
import InputSelectOptions from '../../inputs/InputSelectOptions';
import EditorInput from '../../inputs/EditorInput';
import { MdDelete } from 'react-icons/md';

const EditProduct = () => {
          const navigate = useNavigate()
  const handleArrow =()=>{
    navigate("/admin/products")
  }
   const [product, setProduct] = useState({
    image: null,
    name: "",
    price:"",
    priceBeforeDiscount: "",
    productCategory: "",
    hasDiscount: false,
    discount: "",
    description: "",
    colors: [
    {
      colorName: "",
      sizes: [
        { size: "", quantity: "" }
      ]
    }
  ]
  });
  const handleChange = (e) => {
  const { name, value, files, type } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value
  }));
};
  return (
    <div className='add_new_product'>
      <HeadingComponent heading={"Add Product"} Icon={FaArrowRightLong} click_arrow={handleArrow}  />
          <form   className='form'>
      <div className='all_inputs' >
        <InputFile name="image" onChange={handleChange}  label="Choose image" type="file"/>
        <InputFile name="name" onChange={handleChange} label="Product Name" type="text" />
        <InputSelectOptions name="productCategory" onChange={handleChange} label="choose Category" optionone="Nike" optiontwo="Croocs" optionthree="Shirts" optionfour="Bags"/>
        <InputFile name="price" onChange={handleChange} label="Product Price" type="text" />
        <InputSelectOptions name="hasDiscount" onChange={(e) =>
          setProduct({...product,hasDiscount: e.target.value === "true"})}  label="has Discount"  optionone="true" optiontwo="false" />
        {product.hasDiscount  && <InputFile name="discount" onChange={handleChange} label="Product Discount" type="text"/> }

      </div>
      <div className='editor_input_container'>
              <EditorInput name="description" onChange={handleChange}/>
      </div>

      <div className='product_colors'>
          

        <div className="product-colors-container">

      <div className="header">
        <h2>Product Colors:</h2>
        <button className="add-color-btn" >
          <span><FaPlus/></span>
        </button>
      </div>

            <div className='color_card'>
                <div className='color_name'>
                       <InputFile
                              type="text"
                              label="Color Name"
                              onChange={(e) => {
                                const updatedColors = [...product.colors];

                                updatedColors[0] = {
                                  ...updatedColors[0],
                                  colorName: e.target.value
                                };

                                setProduct({ ...product, colors: updatedColors });
                              }}
                        />
                        <div className='icon'>
                            <MdDelete/>
                        </div>
                </div>
                <div className='quantity_size'>
                    <InputFile 
                    onChange={(e) => {
                                    const updatedColors = [...product.colors];

                                    updatedColors[0] = {
                                      ...updatedColors[0],
                                      sizes: [
                                        {
                                          ...(updatedColors[0]?.sizes?.[0] || {}),
                                          size: e.target.value
                                        }
                                      ]
                                    };

                                    setProduct({ ...product, colors: updatedColors });
                                  }}
                                  type="text" label="size"
                      />
                    <InputFile
                                  type="text"
                                  label="quantity"
                                  onChange={(e) => {
                                    const updatedColors = [...product.colors];

                                    updatedColors[0] = {
                                      ...updatedColors[0],
                                      sizes: [
                                        {
                                          ...(updatedColors[0]?.sizes?.[0] || {}),
                                          quantity: e.target.value
                                        }
                                      ]
                                    };

                                    setProduct({ ...product, colors: updatedColors });
                                  }}
                      />
                      <div className='icon'>
                            <MdDelete/>
                        </div>
                </div>
            </div>

            

      </div>

      </div>
            <div className='add_product'>
                <button type='submit' className='add_product_btn'>add product</button>
            </div>
          </form>
    </div>
  )
}

export default EditProduct
