import PropTypes from "prop-types";
import CustomConfirmDialog from "./CustomConfirmDialog";
import { useDeleteFolder } from "../../hooks/useDeleteFolder";
export function DeleteFolderDialog({ folderModalOpen, closeModal, folderId }) {
  const { mutate: deleteFolder } = useDeleteFolder();
  const handleConfirm = () => {
    deleteFolder({ folderId: folderId });
    closeModal();
  };
  return (
    <CustomConfirmDialog
      open={folderModalOpen}
      onClose={closeModal}
      onConfirm={handleConfirm}
    >
      <p className="text-sm text-gray-700 dark:invert mt-1">
        You will lose all of your saved posts in this folder. This action cannot
        be undone.
      </p>
    </CustomConfirmDialog>
  );
}

DeleteFolderDialog.propTypes = {
  closeModal: PropTypes.func,
  folderModalOpen: PropTypes.bool,
  folderId: PropTypes.string
};
