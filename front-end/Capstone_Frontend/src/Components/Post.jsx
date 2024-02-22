import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserDataById } from "../Redux/actions/userDataActions";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { calculateDistanceToNow } from "../utils/dateUtils";
import {
  checkUserLikedPost,
  removeLike,
  setLike
} from "../Redux/actions/likeAction";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const usersData = useSelector((state) => state.userData.data);
  const [postOwner, setPostOwner] = useState(null);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const timePassed = calculateDistanceToNow(post.publishDate);

  useEffect(() => {
    //se usersData è null vuol dire che non sono ancora neanche stati caricati i dati dell'utente loggato. a questo punto, questo componente post non dovrebbe
    //neanche essere montato.
    //TODO: implementa e migliora il caricamento dei vari componenti per evitare problemi di questo tipo.
    if (!postOwner && usersData) {
      setPostOwner(usersData[post.userId]);
    }
  }, [usersData]);

  useEffect(() => {
    if (post.userId) {
      dispatch(loadUserDataById(token, post.userId));
      //TODO: non ha molto senso creare un reducer per i like.. valutare meglio la cosa
      dispatch(checkUserLikedPost(token, post.id)).then((liked) => {
        setIsPostLiked(liked);
      });
    }
  }, [post.userId]);

  const handleLike = () => {
    setIsPostLiked(!isPostLiked);
    if (!isPostLiked) {
      dispatch(setLike(token, post.id));
      setLikeCount((prev) => prev + 1);
    } else {
      dispatch(removeLike(token, post.id));
      setLikeCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <div className="w-[30px] h-[30px] shrink-0">
            <img
              src={postOwner?.avatarURL}
              alt="avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <p>{postOwner?.name}</p>
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
          <div role="button" onClick={handleLike}>
            {isPostLiked ? (
              <FaHeart size={24} color="red" className="animate-jump" />
            ) : (
              <FaRegHeart size={24} role="button" />
            )}
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
          <small className="opacity-50 text-[0.900rem] font-medium">
            Mostra tutti e - commenti
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
