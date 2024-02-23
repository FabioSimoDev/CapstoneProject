import { useState, useEffect } from "react";

const usePostOwner = (creatorData) => {
  const [postOwner, setPostOwner] = useState(null);

  useEffect(() => {
    setPostOwner(creatorData);
  }, [creatorData]);

  return { postOwner };
};

export default usePostOwner;
