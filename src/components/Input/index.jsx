import PropTypes from "prop-types";

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

function Input({
  label = "",
  name = "",
  type = "text",
  isRequired = true,
  className = "",
  inputClassName = "",
  placeholder = "",
  value = "",
  onChange = () => {},
}) {
  return (
    <div className={`w-1/2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          {label} {isRequired && <span className="text-red-600">*</span>}
        </label>
      )}
      <div>
        <input
          id={name}
          name={name}
          type={type}
          required={isRequired}
          className={`block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset
          bg-light ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${inputClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Input;
