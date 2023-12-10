import "./Button.css";

const Button = ({ text, propriety, type }) => {
  return (
    <button type={type} className={`button button__${propriety}`}>
      {text}
    </button>
  );
};

export default Button;
