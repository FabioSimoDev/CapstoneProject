import PropTypes from "prop-types";
const LoadingDots = () => {
  return (
    <div className="flex gap-2 z-50">
      <div className={`w-2 h-2 rounded-full animate-pulse bg-indigo-700`}></div>
      <div className={`w-2 h-2 rounded-full animate-pulse bg-indigo-700`}></div>
      <div className={`w-2 h-2 rounded-full animate-pulse bg-indigo-700`}></div>
    </div>
  );
};

LoadingDots.propTypes = {
  variant: PropTypes.string
};

export default LoadingDots;
