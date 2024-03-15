import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/backEndUtils";

export const useDeleteFolder = () => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return;
    } catch (error) {
      throw new Error("Failed to delete folder: " + error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: ({ folderId }) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["folders"]);
    }
  });

  return mutation;
};
