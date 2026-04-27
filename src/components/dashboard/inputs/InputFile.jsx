import { BsEye } from "react-icons/bs"
import "./inputs.css"
import { MdDelete } from "react-icons/md"
const InputFile = ({label,type,value,onChange ,name}) => {

  return (
    <div className="input_group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        placeholder={label}
        type={type}
        value={value}
        onChange={onChange}
      />

    </div>
  )
}

export default InputFile
