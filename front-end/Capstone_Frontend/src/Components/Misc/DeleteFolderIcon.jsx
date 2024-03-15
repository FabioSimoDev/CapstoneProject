import PropTypes from "prop-types";
import { MdFolderDelete } from "react-icons/md";
export function DeleteFolderIcon({ hover, openModal }) {
  return (
    <MdFolderDelete
      size={35}
      className={`absolute bottom-2 right-2 text-center transition-opacity duration-300 text-red-300 ${
        hover ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
    />
  );
}

DeleteFolderIcon.propTypes = {
  hover: PropTypes.bool,
  openModal: PropTypes.func
};
