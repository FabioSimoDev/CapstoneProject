import { ImagesSkeleton } from "./ImagesSkeleton";
import { PropTypes } from "prop-types";
import { useState } from "react";

export default function Avatar({ src, alt, widthPX, heightPX }) {
  const [loaded, setLoaded] = useState(false);
  const endLoading = () => {
    setLoaded(true);
  };
  return (
    <div className={`w-[${widthPX}px] h-[${heightPX}px] shrink-0`}>
      <img
        src={src}
        alt={alt}
        className={`rounded-full w-full h-full object-cover ${
          !loaded ? "hidden" : "visible"
        }`}
        onLoad={endLoading}
      />
      <ImagesSkeleton loaded={loaded} rounded={"full"} />
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  widthPX: PropTypes.number,
  heightPX: PropTypes.number
};
