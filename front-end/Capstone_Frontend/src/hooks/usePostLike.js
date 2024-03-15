import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLike, removeLike } from "../Redux/actions/likeAction";

const usePostLike = (post, token) => {
  const dispatch = useDispatch();
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  useEffect(() => {
    setIsPostLiked(post.isLiked);
  }, [post.isLiked]);

  const handleLike = () => {
    setIsPostLiked(!isPostLiked);
    if (!isPostLiked) {
      dispatch(setLike(token, post.id));
      setLikeCount(likeCount + 1);
    } else {
      dispatch(removeLike(token, post.id));
      setLikeCount(likeCount - 1);
    }
  };

  return { isPostLiked, likeCount, handleLike };
};

export default usePostLike;
