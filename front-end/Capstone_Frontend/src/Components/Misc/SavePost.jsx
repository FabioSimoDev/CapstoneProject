import PropTypes from "prop-types";
import { FaRegBookmark } from "react-icons/fa6";
import { useFolderModal } from "../../hooks/useFolderModal";
import FolderModal from "../Modal/FolderModal";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useRemovePostFromFolder } from "../../hooks/useRemovePostFromFolder";

const SavePost = ({ postId, saved: isSaved }) => {
  const { folderModalOpen, openModal, closeModal } = useFolderModal();
  const { mutate: removePostFromFolder } = useRemovePostFromFolder();
  const [saved, setSaved] = useState(isSaved);
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
        <FaBookmark
          size={23}
          onClick={() => {
            setSaved(false);
            removePostFromFolder({ postId: postId });
          }}
        />
      )}
    </>
  );
};

SavePost.propTypes = {
  postId: PropTypes.string,
  saved: PropTypes.bool
};

export default SavePost;
