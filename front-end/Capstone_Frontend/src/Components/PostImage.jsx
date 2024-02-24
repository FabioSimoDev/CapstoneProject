import { PropTypes } from "prop-types";

export default function PostImage({ src, alt }) {
  return (
    <img src={src} alt={alt} className="border border-white/20 rounded-md" />
  );
}

PostImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};
