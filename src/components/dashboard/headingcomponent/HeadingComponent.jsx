import React from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import "./headingcomponet.css"
const HeadingComponent = ({heading,Icon,click_arrow,loading}) => {
  return (
    <div>
      <div className='heading_component'>
        <h1>{heading}</h1>
        <span style={{ cursor: "pointer" }}  onClick={click_arrow}>
            {Icon && <Icon className={`icon ${loading ? "spin" : ""}`}  />}
        </span>
      </div>
    </div>
  )
}

export default HeadingComponent
