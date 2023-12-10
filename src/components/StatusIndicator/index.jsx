import PropTypes from "prop-types";

StatusIndicator.propTypes = {
  isConnected: PropTypes.bool,
};

function StatusIndicator({ isConnected }) {
  return isConnected ? (
    <span className="top-0 start-14 absolute w-3.5 h-3.5 bg-green-500 rounded-full"></span>
  ) : (
    <span className="top-0 start-14 absolute w-3.5 h-3.5 bg-red-500 rounded-full"></span>
  );
}
export default StatusIndicator;
