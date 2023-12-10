import PropTypes from "prop-types";

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

function Button({
  label = "Button",
  type = "button",
  className = "",
  disabled = false,
  onClick = () => {},
}) {
  return (
    <button
      type={type}
      className={`flex justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover ${className}`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}

export default Button;
