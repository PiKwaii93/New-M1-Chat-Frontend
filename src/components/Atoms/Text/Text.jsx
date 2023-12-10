import './Text.css';

const Text = ({ text, type, propriety }) => {
  return (
    <p className={`text ${type} ${propriety}`}>{text}</p>
  );
};
  
export default Text;