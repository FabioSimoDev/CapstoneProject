import Avatar from "./Avatar";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

export default function PostHeader({
  username,
  timePassed,
  userId,
  avatarURL
}) {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      className="flex gap-3 items-center"
      role="button"
      onClick={handleUsernameClick}
    >
      <Avatar src={avatarURL} alt="avatar" widthPX={30} heigthPX={30} />
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <p>{username}</p>
          <p className="opacity-50">• {timePassed}</p>
        </div>
        <button aria-label="Impostazioni post">...</button>
      </div>
    </div>
  );
}

PostHeader.propTypes = {
  username: PropTypes.string,
  timePassed: PropTypes.string,
  userId: PropTypes.string,
  avatarURL: PropTypes.string
};
