import React from "react";
import "./Form.scss";
const Form = ({
  id,
  label,
  type,
  placeholder,
  mess,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      <span>{mess}</span>
    </div>
  );
};

export default Form;
