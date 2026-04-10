import React from 'react'
import "./empty.css"

import { FaRecordVinyl } from "react-icons/fa6";

const Emptycomponent = ({heading1,paragraph}) => {
  return (
    <div className='Empty_order'>
        <div className='container'>
            <div className='empty'>
                <div className='icon'>
                <FaRecordVinyl/>
            </div>
            <h1>{heading1}</h1>
            <p>{paragraph}</p>
            </div>
        </div>
    </div>
  )
}

export default Emptycomponent
