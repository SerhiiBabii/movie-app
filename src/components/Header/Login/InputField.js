import React from "react";

const InputField = ({
  title,
  type,
  id,
  placeholder,
  name,
  value,
  error,
  onChange,
  onBlur
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;
