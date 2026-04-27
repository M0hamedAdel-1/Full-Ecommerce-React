import React from 'react'

const InputSelectOptions = ({label, name,value, onChange,options}) => {
  
  return (
    <div className="input_group">
            <label htmlFor="file">{label}</label>
            <select onChange={onChange} name={name} value={value}>
                <option value="">{label}</option>
                {options?.map((option)=>(
                  <option key={option.id} value={option.name}>{option.name}</option>
                ))}
            </select>
     </div>
  )
}

export default InputSelectOptions
