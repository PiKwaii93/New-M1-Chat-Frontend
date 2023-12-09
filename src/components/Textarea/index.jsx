import PropTypes from "prop-types";

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  textareaClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

function Textarea({
  label = "",
  name = "",
  isRequired = true,
  className = "",
  textareaClassName = "",
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
        <textarea
          id={name}
          name={name}
          rows={1}
          className={`block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset
          bg-light ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${textareaClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Textarea;
