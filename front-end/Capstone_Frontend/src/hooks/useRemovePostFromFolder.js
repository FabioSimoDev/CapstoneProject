import { useSelector } from "react-redux";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/backEndUtils";

export const useRemovePostFromFolder = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);

  const addPostToFolder = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/folders/removePost/${postId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to remove from folder: " + error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: ({ postId }) => addPostToFolder(postId),
    onSuccess: () => queryClient.invalidateQueries(["folders"])
  });

  return mutation;
};
