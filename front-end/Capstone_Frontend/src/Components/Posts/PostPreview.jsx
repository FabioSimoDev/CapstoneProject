import PropTypes from "prop-types";
import { useState } from "react";
import PostPreviewSkeleton from "./PostPreviewSkeleton";
import { usePostModal } from "../../hooks/usePostModal";
import PostModal from "./PostModal";
import usePostOwner from "../../hooks/usePostOwner";
import usePostLike from "../../hooks/usePostLike";
import { useSelector } from "react-redux";
import { useRef } from "react";

export default function PostPreview({ post }) {
  const [hover, setHover] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [imageLoading, setImageLoading] = useState(true);
  const {
    postModalOpen,
    timePassed,
    comments,
    openModal,
    closeModal,
    publishComment
  } = usePostModal(post);
  const { postOwner } = usePostOwner(post.creatorData);
  const { isPostLiked, likeCount, handleLike } = usePostLike(post, token);
  const newCommentInput = useRef();

  return (
    <>
      <PostModal
        isOpen={postModalOpen}
        onClose={closeModal}
        post={post}
        postOwner={postOwner}
        comments={comments}
        timePassed={timePassed}
        isPostLiked={isPostLiked}
        likeCount={likeCount}
        handleLike={handleLike}
        publishComment={() => publishComment(newCommentInput?.current?.value)}
        newCommentInput={newCommentInput}
      />
      <div
        className="w-full aspect-square relative"
        role="button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={openModal}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            hover ? "bg-black/80" : ""
          }`}
        ></div>
        {imageLoading && <PostPreviewSkeleton />}
        <img
          src={post.image_url}
          alt="immagine"
          className={`w-full aspect-square object-cover object-center ${
            imageLoading ? "hidden" : "block"
          }`}
          draggable={false}
          onLoad={() => setImageLoading(false)}
        ></img>
        <p
          draggable={false}
          className={`absolute z-10 top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[500ms] post-title font-bold ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          {post.title}
        </p>
      </div>
    </>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    image_url: PropTypes.string,
    title: PropTypes.string,
    creatorData: PropTypes.any
  })
};
