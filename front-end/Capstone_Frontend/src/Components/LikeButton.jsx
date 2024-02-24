import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PropTypes } from "prop-types";

export default function LikeButton({ isLiked, handleLike }) {
  return isLiked ? (
    <FaHeart
      size={24}
      color="red"
      className="animate-jump"
      onClick={handleLike}
      aria-label="post piaciuto"
    />
  ) : (
    <FaRegHeart size={24} onClick={handleLike} aria-label="metti mi piace" />
  );
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool,
  handleLike: PropTypes.func
};
