import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, POSTS_ENDPOINTS } from "../utils/backEndUtils";

export function usePostForm() {
  const queryClient = useQueryClient();

  async function addHashtag(token, hashtag, postId) {
    alert("hashtag fetch");
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
        alert("la lunghezza è maggiore di 0 ( ci sono hashtags ) ");
        const postId = resJson.id;
        hashtags.map(
          async (hashtag) => await addHashtag(token, hashtag, postId)
        );
      } else {
        alert("NON CI SONO HASHTAGS NOOOO");
      }

      return resJson;
    },
    onSuccess: () => {
      alert("finito.");
      queryClient.invalidateQueries(["posts"]);
    }
  });

  return mutation;
}
