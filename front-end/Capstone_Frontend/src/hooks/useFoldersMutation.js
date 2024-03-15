import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/backEndUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFoldersMutation = () => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  const createFolder = async (folderName) => {
    try {
      const response = await fetch(`${BASE_URL}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ name: folderName })
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to create folder: " + error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: async ({ folderName }) => createFolder(folderName),
    onSuccess: () => {
      queryClient.invalidateQueries(["folders"]);
    }
  });

  return mutation;
};
