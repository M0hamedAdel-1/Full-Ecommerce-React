import "./inputs.css"
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
