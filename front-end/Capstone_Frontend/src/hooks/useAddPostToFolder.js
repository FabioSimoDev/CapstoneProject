import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../utils/backEndUtils";
import { useSelector } from "react-redux";

export const useAddPostToFolder = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);

  const addPostToFolder = async (postId, folderId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/folders/${folderId}/addPost/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to create folder: " + error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: ({ postId, folderId }) => addPostToFolder(postId, folderId),
    onSuccess: () => queryClient.invalidateQueries(["folders"])
  });

  return mutation;
};
