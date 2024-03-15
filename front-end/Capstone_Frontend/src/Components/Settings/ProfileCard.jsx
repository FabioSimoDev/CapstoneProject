import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-2 items-center py-2 px-2 dark:hover:bg-white/10 rounded-md"
      onClick={() => navigate("/profile/" + profile.id)}
      role="button"
    >
      <div className="w-10 aspect-square rounded-full shrink-0">
        <img
          src={profile.avatarURL ?? ""}
          alt="avatar"
          className="w-full object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center truncate">
        <p className="font-semibold m-0 text-md leading-4">
          {profile.username}
        </p>
        <p className="opacity-75 text-sm w-full flex gap-2">
          {profile.name} {profile.surname} <p>•</p>{" "}
          <p>Reputation: {profile.reputation?.points ?? "0"}</p>
        </p>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    reputation: PropTypes.number,
    username: PropTypes.string,
    avatarURL: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string
  })
};

export default ProfileCard;
