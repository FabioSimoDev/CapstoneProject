import { FaRegBookmark } from "react-icons/fa6";
import { useFolderModal } from "../hooks/useFolderModal";
import FolderModal from "./FolderModal";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";

const SavePost = ({ postId }) => {
  const { folderModalOpen, openModal, closeModal } = useFolderModal();
  const [saved, setSaved] = useState(false);
  return (
    <>
      <FolderModal
        open={folderModalOpen}
        onClose={closeModal}
        postId={postId}
      />
      {!saved ? (
        <FaRegBookmark
          size={23}
          role="button"
          onClick={() => {
            openModal();
            setSaved(true);
          }}
        />
      ) : (
        <FaBookmark size={23} />
      )}
    </>
  );
};

export default SavePost;
