import PropTypes from "prop-types";
export function ImagesSkeleton({ loaded, rounded }) {
  return (
    <div
      className={`w-full aspect-square animate-pulse bg-slate-200 dark:bg-slate-700 rounded-${rounded} ${
        loaded ? "hidden" : "visible"
      }`}
    ></div>
  );
}

ImagesSkeleton.propTypes = {
  loaded: PropTypes.bool,
  rounded: PropTypes.string
};
