import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/backEndUtils";
import { useQuery } from "@tanstack/react-query";

export const useFolderQuery = (open) => {
  const token = useSelector((state) => state.auth.token);

  const fetchUserFolder = async () => {
    try {
      const response = await fetch(`${BASE_URL}/folders/me`, {
        headers: { Authorization: "Bearer " + token }
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch folders: " + error.message);
    }
  };

  return useQuery({
    queryKey: ["folders"],
    queryFn: () => fetchUserFolder(),
    enabled: !!open
  });
};
