import React from 'react'

const InputSelectOptions = ({label,optionone,optiontwo,optionthree,optionfour,onChange}) => {
  return (
    <div className="input_group">
            <label htmlFor="file">{label}</label>
            <select onChange={onChange}>
                <option value="">{label}</option>
                {optionone && <option value={optionone}>{optionone}</option>}
                {optiontwo && <option value={optiontwo}>{optiontwo}</option>}
                {optionthree && <option value={optionthree}>{optionthree}</option> }
                {optionfour && <option value={optionfour}>{optionfour}</option>}
            </select>
     </div>
  )
}

export default InputSelectOptions
