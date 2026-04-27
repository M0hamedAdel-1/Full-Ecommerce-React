import React from 'react'

const SearchComponents = ({ value, onChange}) => {
  return (
    <div className='search'>

      <input value={value} onChange={onChange} className='search_input' type='search' placeholder='search here'/>
    </div>
  )
}

export default SearchComponents
