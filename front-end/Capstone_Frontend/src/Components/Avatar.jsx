import { PropTypes } from "prop-types";

export default function Avatar({ src, alt, widthPX, heightPX }) {
  return (
    <div className={`w-[${widthPX}px] h-[${heightPX}px] shrink-0`}>
      <img
        src={src}
        alt={alt}
        className="rounded-full w-full h-full object-cover"
      />
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  widthPX: PropTypes.number,
  heightPX: PropTypes.number
};
