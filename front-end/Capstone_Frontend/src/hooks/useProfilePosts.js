import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalPosts, getPostsByUser } from "../Redux/actions/postActions";
import { useNavigate } from "react-router";

export const useProfilePost = (userId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (!userId) navigate("/home");
    if (token && userId) {
      if (userId === "me") {
        dispatch(getPersonalPosts(token));
      } else {
        dispatch(getPostsByUser(token, userId));
      }
    }
  }, [token, userId]);

  return posts;
};
