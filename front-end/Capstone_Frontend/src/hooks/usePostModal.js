import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPostComments } from "../Redux/actions/commentActions";
import { calculateDistanceToNow } from "../utils/dateUtils";
import { createComment } from "../Redux/actions/commentActions";

export const usePostModal = (post) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const timePassed = calculateDistanceToNow(post.publishDate);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const openModal = () => {
    setPostModalOpen(true);
    dispatch(getPostComments(token, post.id));
  };

  const publishComment = (value) => {
    if (value) {
      dispatch(createComment(token, post.id, value));
    }
  };

  const closeModal = () => {
    setPostModalOpen(false);
  };

  return {
    postModalOpen,
    timePassed,
    comments,
    openModal,
    closeModal,
    publishComment
  };
};
