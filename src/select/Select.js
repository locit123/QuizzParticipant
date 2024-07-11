import React from "react";

const Select = ({ mess, label, id, children, register, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="form-control"
        {...register}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <span>{mess}</span>
    </div>
  );
};

export default Select;
