import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/backEndUtils";
import { useSelector } from "react-redux";

export const useFollow = (userId) => {
  const [follow, setFollow] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const followUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/follow/${userId}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setFollow(true);
    } catch (error) {
      throw new Error("Failed to follow user: " + error.message);
    }
  };

  const unfollowUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/unfollow/${userId}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setFollow(false);
    } catch (error) {
      throw new Error("Failed to follow user: " + error.message);
    }
  };

  useEffect(() => {
    if (userId) checkFollow();
  }, [userId]);

  const checkFollow = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/follows/${userId}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const isFollow = await response.json();
      setFollow(isFollow);
      return;
    } catch (error) {
      throw new Error("Failed to follow user: " + error.message);
    }
  };

  return { follow, followUser, unfollowUser };
};
