import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, POSTS_ENDPOINTS } from "../utils/backEndUtils";

export function usePostForm(setLoading) {
  const queryClient = useQueryClient();

  async function addHashtag(token, hashtag, postId) {
    const response = await fetch(
      `${BASE_URL}${POSTS_ENDPOINTS.CREATE_POST}/${postId}/addHashtag/${hashtag}`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token }
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json;
  }

  const mutation = useMutation({
    mutationFn: async ({ formData, token, hashtags }) => {
      setLoading(true);
      const response = await fetch(BASE_URL + POSTS_ENDPOINTS.CREATE_POST, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resJson = await response.json();
      if (hashtags.length > 0) {
        const postId = resJson.id;
        hashtags.map(
          async (hashtag) => await addHashtag(token, hashtag, postId)
        );
      }

      return resJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setLoading(false);
    }
  });

  return mutation;
}
