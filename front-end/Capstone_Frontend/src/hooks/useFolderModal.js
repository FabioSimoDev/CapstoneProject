import { useState } from "react";

export const useFolderModal = () => {
  const [folderModalOpen, setFolderModalOpen] = useState(false);

  const openModal = () => {
    setFolderModalOpen(true);
  };

  const closeModal = () => {
    setFolderModalOpen(false);
  };

  return { folderModalOpen, openModal, closeModal };
};
