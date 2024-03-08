import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/backEndUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFolderPost = (folderId) => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const fetchFolderPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch hashtags: " + error.message);
    }
  };

  return useQuery({
    queryKey: ["folderPost", folderId],
    queryFn: () => fetchFolderPost()
  });
};
