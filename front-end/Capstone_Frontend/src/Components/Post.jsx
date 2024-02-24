import { PropTypes } from "prop-types";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
import { calculateDistanceToNow } from "../utils/dateUtils";
import {
  createComment,
  getPostComments
} from "../Redux/actions/commentActions";
import PostModal from "./PostModal";
import usePostOwner from "../hooks/usePostOwner";
import usePostLike from "../hooks/usePostLike";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const usersData = useSelector((state) => state.userData.data);
  const { postOwner } = usePostOwner(post.creatorData);
  const { isPostLiked, likeCount, handleLike } = usePostLike(post, token);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const comments = useSelector((state) => state.comments);
  const newCommentInput = useRef();

  const timePassed = calculateDistanceToNow(post.publishDate);

  //se usersData è null vuol dire che non sono ancora neanche stati caricati i dati dell'utente loggato. a questo punto, questo componente post non dovrebbe
  //neanche essere montato.
  //TODO: implementa e migliora il caricamento dei vari componenti per evitare problemi di questo tipo.

  const openModal = () => {
    setPostModalOpen(true);
    dispatch(getPostComments(token, post.id));
  };

  const publishComment = () => {
    if (newCommentInput.current.value) {
      dispatch(createComment(token, post.id, newCommentInput.current.value));
    }
  };

  return (
    <>
      {
        <PostModal
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
          post={post}
          postOwner={postOwner}
          comments={comments}
          isPostLiked={isPostLiked}
          timePassed={timePassed}
          likeCount={likeCount}
          handleLike={handleLike}
          publishComment={publishComment}
          newCommentInput={newCommentInput}
        />
      }
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center" role="button">
          <div className="w-[30px] h-[30px] shrink-0">
            <img
              src={postOwner?.avatarURL}
              alt="avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <p>{postOwner?.username}</p>
              <p className="opacity-50">• {timePassed}</p>
            </div>
            <button aria-label="Impostazioni post">...</button>
          </div>
        </div>
        <img
          src="https://scontent.cdninstagram.com/v/t39.30808-6/422746694_18216711097272497_8883752278101428040_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=6tfXy7A6kP8AX9y3cBy&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMwNTkyNDQyNjQ3ODU1MDA1OA%3D%3D.2-ccb7-5&oh=00_AfBbN7X77AKmiHdZitjHugY8pe8TVcbAAVAq905bogZ-RQ&oe=65D8BB1E&_nc_sid=10d13b"
          alt="foto"
          className="border border-white/20 rounded-md"
        />
        <div className="flex flex-col gap-2">
          <div role="button" className="flex gap-3 w-min">
            {isPostLiked ? (
              <FaHeart
                size={24}
                color="red"
                className="animate-jump"
                onClick={handleLike}
                aria-label="post piaciuto"
              />
            ) : (
              <FaRegHeart
                size={24}
                role="button"
                onClick={handleLike}
                aria-label="metti mi piace"
              />
            )}
            <IoChatbubbleOutline size={24} onClick={openModal} />
          </div>

          {post.likeCount > 0 && (
            <small className="text-sm">
              Piace a <span className="font-semibold">{likeCount} persone</span>
            </small>
          )}
          <small>
            <span className="font-semibold">{postOwner?.username}:</span>{" "}
            {post.content}
          </small>
          <small
            role="button"
            className="opacity-50 text-[0.900rem] font-medium"
            onClick={openModal}
          >
            {post.totalComments
              ? `Mostra tutti e ${post.totalComments} commenti`
              : null}
          </small>
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object
};

export default Post;
