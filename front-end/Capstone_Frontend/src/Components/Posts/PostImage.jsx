import { PropTypes } from "prop-types";
import { useState } from "react";
import { ImagesSkeleton } from "../UI/ImagesSkeleton";

export default function PostImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const endLoading = () => {
    setLoaded(true);
  };
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`border border-white/20 rounded-md ${
          !loaded ? "hidden" : "visible"
        }`}
        onLoad={endLoading}
      />
      <ImagesSkeleton loaded={loaded} rounded={"md"} />
    </>
  );
}

PostImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};
