import useQuery from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/backEndUtils";

export const useHashtags = (hashtagQuery) => {
  const token = useSelector((state) => state.auth.token);

  const fetchHashtags = async (query) => {
    if (!query) return [];
    try {
      const response = await fetch(`${BASE_URL}/hashtags/?query=${query}`, {
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch hashtags: " + error.message);
    }
  };

  return useQuery({
    queryKey: ["hashtags", hashtagQuery],
    queryFn: () => fetchHashtags(hashtagQuery),
    enabled: !!hashtagQuery
  });
};
