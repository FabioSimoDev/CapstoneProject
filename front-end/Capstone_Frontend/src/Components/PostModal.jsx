import Modal from "./Modal/Modal";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { calculateDistanceToNow } from "../utils/dateUtils";
import { PropTypes } from "prop-types";
import { Fragment } from "react";

const PostModal = ({
  isOpen,
  onClose,
  post,
  postOwner,
  comments,
  isPostLiked,
  likeCount,
  timePassed,
  handleLike,
  publishComment,
  newCommentInput
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex h-full w-full text-black dark:text-white">
        <img
          src={post.image_url}
          alt="immagine"
          className="h-full max-w-xxl aspect-auto object-cover"
          draggable={false}
        />
        <div className="grow max-w-lg flex flex-col px-3 dark:bg-black border-l border-white/20">
          <div className="flex justify-between border-b border-white/20 py-3">
            <div className="flex items-center gap-3">
              <div className="w-[35px] h-[35px]">
                <img
                  src={postOwner?.avatarURL}
                  alt="Avatar"
                  className="rounded-full w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <small className="font-bold">{postOwner?.username}</small>
            </div>
          </div>
          <div className="h-[75%] overflow-y-auto space-y-4 pt-2">
            {comments.isLoading ? (
              <span>Loading comments...</span>
            ) : comments.error ? (
              <span>Error loading comments</span>
            ) : (
              comments.comments?.content.map((comment, index) => (
                <Fragment key={index}>
                  <div className="flex w-full gap-3">
                    <div className="w-[35px] h-[35px] shrink-0">
                      <img
                        src={comment.user.avatarURL}
                        alt="Avatar"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-10/12">
                      <p className="text-sm break-words">
                        <span className="font-bold">
                          {comment.user.username}
                        </span>{" "}
                        {comment.content}
                      </p>
                      <small className="text-xs">
                        {calculateDistanceToNow(comment.date)}
                      </small>
                    </div>
                  </div>
                </Fragment>
              ))
            )}
          </div>
          <div className="flex-col border-b border-white/20">
            <div className="flex justify-between">
              <button onClick={handleLike}>
                {isPostLiked ? (
                  <FaHeart size={24} color="red" className="animate-jump" />
                ) : (
                  <FaRegHeart size={24} role="button" />
                )}
              </button>
            </div>
            {post.likeCount > 0 && (
              <small className="text-sm">
                Piace a{" "}
                <span className="font-semibold">{likeCount} persone</span>
              </small>
            )}
            <p>{timePassed}</p>
          </div>
          <div className="flex justify-between overflow-y-auto items-center">
            <textarea
              name="commentInput"
              id=""
              cols="30"
              rows="1"
              ref={newCommentInput}
              placeholder="Aggiungi un commento"
              className="resize-none bg-transparent outline-none rounded-xl h-fit py-2"
            ></textarea>
            <button onClick={publishComment}>Pubblica</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

PostModal.propTypes = {
  post: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  postOwner: PropTypes.object,
  comments: PropTypes.object,
  isPostLiked: PropTypes.bool,
  likeCount: PropTypes.number,
  handleLike: PropTypes.func,
  publishComment: PropTypes.func,
  newCommentInput: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  timePassed: PropTypes.string
};

export default PostModal;
