import { useQuery } from "@tanstack/react-query";
import { BASE_URL, POSTS_ENDPOINTS } from "../utils/backEndUtils";

const fetchAllPosts = async (token) => {
  try {
    console.log("sto inculando tutti i post");
    const response = await fetch(
      BASE_URL + POSTS_ENDPOINTS.GET_ALL_POSTS + "?size=50&orderBy=publishDate",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Posts: " + error.message);
  }
};

export function usePostsQuery(token) {
  return useQuery({
    queryKey: ["posts", token],
    queryFn: () => fetchAllPosts(token),
    staleTime: 120000,
    enabled: !!token
  });
}
