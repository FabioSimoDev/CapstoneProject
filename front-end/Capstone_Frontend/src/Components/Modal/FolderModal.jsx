import PropTypes from "prop-types";
import { useFolderQuery } from "../../hooks/useFolderQuery";
import CreateFolderMinimal from "../Misc/CreateFolderMinimal";
import FolderPreviewMinimal from "../Misc/FolderPreviewMinimal";
import { MdErrorOutline } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useFoldersMutation } from "../../hooks/useFoldersMutation";
import { useAddPostToFolder } from "../../hooks/useAddPostToFolder";

const FolderModal = ({ open, onClose, postId }) => {
  const { data: folders, isLoading, isError, error } = useFolderQuery(open);
  const createFolderInputRef = useRef(null);
  const { mutate: createFolder } = useFoldersMutation();
  const { mutate: addPost } = useAddPostToFolder();

  //TODO: controllare se il post è già salvato in qualche cartella e mostrare l'icona adatta.
  useEffect(() => {
    if (createFolderInputRef) createFolderInputRef.current?.focus();
  }, [createFolderInputRef?.current, open]);

  useEffect(() => {
    if (open && folders)
      addPost({
        folderId: folders?.content[folders.content.length - 1]?.id,
        postId: postId
      });
  }, [folders, addPost, postId, open]);

  const handleCreateFolder = () => {
    if (createFolderInputRef.current)
      createFolder({ folderName: createFolderInputRef.current.value });
  };

  console.log(folders);
  return (
    //"backdrop"
    <div
      onClick={onClose}
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center transition-colors duration-300 z-[60] py-10 ${
        open ? "visible bg-black/80" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-zinc-800 rounded-xl shadow transition-all w-fit h-fit ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {isLoading ? (
          <div className="flex gap-2 justify-center items-center h-32 dark:invert px-10">
            <span className="sr-only">Loading...</span>
            <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
          </div>
        ) : isError ? (
          <div className="p-10 flex flex-col items-center">
            <MdErrorOutline size={30} className="text-red-500" />
            <p className="decoration underline decoration-red-500 decoration-2 text-center">
              Prova a ricaricare la pagina!
            </p>
            <span className="opacity-50 text-red-400 no-underline">
              {error.message}
            </span>
          </div>
        ) : folders && folders?.content?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 p-4">
            {folders?.content?.map((folder, index) => {
              return (
                <FolderPreviewMinimal
                  key={index}
                  folder={folder}
                  postId={postId}
                  closeModal={onClose}
                  addPost={addPost}
                />
              );
            })}
            <CreateFolderMinimal
              inputRef={createFolderInputRef}
              handleCreateFolder={handleCreateFolder}
            />
          </div>
        ) : (
          <CreateFolderMinimal
            inputRef={createFolderInputRef}
            handleCreateFolder={handleCreateFolder}
          />
        )}
      </div>
    </div>
  );
};

FolderModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  postId: PropTypes.string
};

export default FolderModal;
