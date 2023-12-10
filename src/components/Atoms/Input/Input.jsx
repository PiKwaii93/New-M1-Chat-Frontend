import React from "react";
import "./Input.css";

const Input = ({ type, placeholder, isRequired, value, onChange, name }) => {
  const handleInputChange = (e) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: e.target.value,
        },
      });
    }
  };

  return (
    <input
      type={type}
      className={`input input__${type}`}
      placeholder={placeholder}
      required={isRequired}
      value={value || ""}
      onChange={handleInputChange}
      name={name}
    />
  );
};

export default Input;
