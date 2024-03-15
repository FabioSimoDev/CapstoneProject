import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useFollow } from "../../hooks/useFollow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/backEndUtils";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";

const UserProfileHeader = ({ userData, userId, postCount }) => {
  const personalData = useSelector((state) => state.userData.currentUser);
  const token = useSelector((state) => state.auth.token);
  const { follow, followUser, unfollowUser } = useFollow(userId);
  const [followerCount, setFollowerCount] = useState(0);
  const [reputation, setReputation] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setFollowerCount(userData?.followersCount);
    setReputation(userData?.reputation?.points ?? 0);
  }, [userData]);

  const addReputation = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/reputation`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const reputation = await response.json();
      setReputation(reputation.points);
    } catch (error) {
      throw new Error("Failed to follow user: " + error.message);
    }
  };

  return (
    <div className="flex flex-row sm:gap-24 gap-12 mx-auto mb-14">
      <div className="sm:w-[10rem] w-[5rem] aspect-square shrink-0">
        <img
          src={userData.avatarURL}
          alt="avatar"
          className="rounded-full w-full aspect-square object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-evenly gap-2">
        <div className="flex gap-8 items-center">
          <h1 className="sm:text-xl text-lg">{userData.username}</h1>
          {userData.id === personalData.id ? (
            <button
              className="secondary-button"
              onClick={() => navigate("/settings")}
            >
              Modifica profilo
            </button>
          ) : (
            <>
              <FaPersonArrowUpFromLine
                role="button"
                className="hover:scale-125 transition-transform duration-200 active:animate-jump"
                onClick={addReputation}
              />
              {!follow ? (
                <button
                  className="secondary-button"
                  onClick={() => {
                    followUser();
                    setFollowerCount((prev) => prev + 1);
                  }}
                >
                  Segui
                </button>
              ) : (
                <button
                  className="secondary-button"
                  onClick={() => {
                    unfollowUser();
                    setFollowerCount((prev) => prev - 1);
                  }}
                >
                  Smetti di seguire
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex gap-x-8 gap-y-2 items-center flex-wrap">
          <p className="font-semibold text-sm sm:text-md">
            {postCount} <span className="font-normal">post</span>
          </p>
          <p className="font-semibold text-sm sm:text-md">
            {followerCount} <span className="font-normal">follower</span>
          </p>
          <p className="font-semibold text-sm sm:text-md">
            {userData.followingCount}{" "}
            <span className="font-normal">seguiti</span>
          </p>
          <p className="font-semibold text-sm sm:text-md">
            {reputation}{" "}
            <span className="font-normal text-sm sm:text-md">reputazione</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{userData.name}</p>
          <p className="text-sm">{userData.biography}</p>
        </div>
      </div>
    </div>
  );
};

UserProfileHeader.propTypes = {
  postCount: PropTypes.number,
  userData: PropTypes.shape({
    avatarURL: PropTypes.string,
    biography: PropTypes.string,
    followersCount: PropTypes.number,
    followingCount: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    reputation: PropTypes.shape({
      points: PropTypes.number
    }),
    username: PropTypes.string
  }),
  userId: PropTypes.string
};

export default UserProfileHeader;
