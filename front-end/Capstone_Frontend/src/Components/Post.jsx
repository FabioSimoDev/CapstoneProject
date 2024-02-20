import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserDataById } from "../Redux/actions/userDataActions";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const usersData = useSelector((state) => state.userData.data);
  const [postOwner, setPostOwner] = useState(null);

  useEffect(() => {
    if (usersData) {
      setPostOwner(usersData[post.userId]);
    }
  }, [usersData]);

  useEffect(() => {
    if (post.userId) {
      dispatch(loadUserDataById(token, post.userId));
    }
  }, []);
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
            <p>{postOwner?.name}</p>
            <button aria-label="Impostazioni post">...</button>
          </div>
        </div>
        <img
          src="https://scontent.cdninstagram.com/v/t39.30808-6/422746694_18216711097272497_8883752278101428040_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=6tfXy7A6kP8AX9y3cBy&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMwNTkyNDQyNjQ3ODU1MDA1OA%3D%3D.2-ccb7-5&oh=00_AfBbN7X77AKmiHdZitjHugY8pe8TVcbAAVAq905bogZ-RQ&oe=65D8BB1E&_nc_sid=10d13b"
          alt="foto"
          className="border border-white/20 rounded-md"
        />
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object
};

export default Post;
