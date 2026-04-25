import React from 'react'
import InputFile from './InputFile'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const ProductColorInput = () => {
  return (
    <div className="product-colors-container">

      <div className="header">
        <h2>Product Colors:</h2>
        <button className="add-color-btn" >
          <span><FaPlus/></span>
        </button>
      </div>

            <div className='color_card'>
                <div className='color_name'>
                        <InputFile type="text" label="Color Name"/>
                        <div className='icon'>
                            <MdDelete/>
                        </div>
                </div>
                <div className='quantity_size'>
                    <InputFile type="text" label="size"/>
                    <InputFile type="text" label="quantity"/>
                      <div className='icon'>
                            <MdDelete/>
                        </div>
                </div>
            </div>

            

      </div>
  )
}

export default ProductColorInput
// not use