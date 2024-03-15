import { useState } from "react";

export const useModalPageNavigation = (initialPage) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return { currentPage, nextPage, prevPage, setCurrentPage };
};
