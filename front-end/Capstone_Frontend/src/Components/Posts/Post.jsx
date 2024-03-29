import { PropTypes } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateDistanceToNow } from "../../utils/dateUtils";
import {
  createComment,
  getPostComments
} from "../../Redux/actions/commentActions";
import PostModal from "./PostModal";
import usePostOwner from "../../hooks/usePostOwner";
import usePostLike from "../../hooks/usePostLike";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostContent from "./PostContent";
import { getPostHashtags } from "../../Redux/actions/hashtagActions";
import PostTitle from "./PostTitle";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const usersData = useSelector((state) => state.userData.data);
  const { postOwner } = usePostOwner(post.creatorData);
  const { isPostLiked, likeCount, handleLike } = usePostLike(post, token);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postHashtags, setPostHashtags] = useState(null);
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

  useEffect(() => {
    dispatch(getPostHashtags(token, post.id)).then((data) => {
      if (data) {
        setPostHashtags(data);
      }
    });
  }, [dispatch, post.id, token]);

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
      <div className="flex flex-col gap-2">
        <PostHeader
          username={postOwner?.username}
          timePassed={timePassed}
          userId={postOwner?.userId}
          avatarURL={postOwner?.avatarURL}
        />
        <PostTitle postTitle={post.title} />
        <PostImage
          alt={"post image"}
          src={
            post.image_url ??
            "https://predis.ai/resources/wp-content/uploads/2021/12/instagram-reels-sizes-dimensions-ratios-0-1-893x1024.png"
          }
        />
        <div className="flex flex-col gap-2">
          <PostActions
            isPostLiked={isPostLiked}
            handleLike={handleLike}
            openModal={openModal}
            likeCount={likeCount}
            postId={post.id}
            saved={post.isSaved}
            postHashtags={postHashtags?.content ?? []}
          />
          <PostContent
            username={postOwner?.username}
            content={post.content}
            totalComments={post.totalComments}
            openModal={openModal}
          />
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object
};

export default Post;
