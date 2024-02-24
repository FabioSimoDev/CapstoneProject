import { PropTypes } from "prop-types";
import LikeButton from "./LikeButton";
import { IoChatbubbleOutline } from "react-icons/io5";

export default function PostActions({
  isPostLiked,
  handleLike,
  openModal,
  likeCount
}) {
  return (
    <div>
      <div className="flex gap-3 w-min" role="button">
        <LikeButton isLiked={isPostLiked} handleLike={handleLike} />
        <IoChatbubbleOutline size={24} onClick={openModal} />
      </div>
      {likeCount > 0 && (
        <small className="text-sm">
          Piace a <span className="font-semibold">{likeCount} persone</span>
        </small>
      )}
    </div>
  );
}

PostActions.propTypes = {
  isPostLiked: PropTypes.bool,
  handleLike: PropTypes.func,
  openModal: PropTypes.func,
  likeCount: PropTypes.number
};
