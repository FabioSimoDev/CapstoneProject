import { PropTypes } from "prop-types";
import LikeButton from "../UI/LikeButton";
import { IoChatbubbleOutline } from "react-icons/io5";
import HashtagsDisplay from "../Misc/HashtagsDisplay";
import SavePost from "../Misc/SavePost";

export default function PostActions({
  isPostLiked,
  handleLike,
  openModal,
  likeCount,
  postId,
  postHashtags,
  saved
}) {
  return (
    <div>
      <div className="flex gap-3 w-full items-center">
        <LikeButton isLiked={isPostLiked} handleLike={handleLike} />
        <IoChatbubbleOutline size={24} onClick={openModal} role="button" />
        <HashtagsDisplay hashtags={postHashtags} />
        <div className="ms-auto">
          <SavePost postId={postId} saved={saved} />
        </div>
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
  likeCount: PropTypes.number,
  postHashtags: PropTypes.array,
  postId: PropTypes.string,
  saved: PropTypes.bool
};
