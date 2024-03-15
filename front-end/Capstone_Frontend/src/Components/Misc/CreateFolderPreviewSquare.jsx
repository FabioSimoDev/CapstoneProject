import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreateFolderMinimal from "./CreateFolderMinimal";
import { useFoldersMutation } from "../../hooks/useFoldersMutation";
const CreateFolderPreviewSquare = () => {
  const [clicked, setClicked] = useState(false);
  const createFolderInputRef = useRef(null);
  const {
    mutate: createFolder,
    isLoading: createFolderLoading,
    isError: createFolderIsError,
    error: createFolderError
  } = useFoldersMutation();
  const handleCreateFolder = () => {
    if (createFolderInputRef.current)
      createFolder({ folderName: createFolderInputRef.current.value });
  };
  //TODO: cambiare la struttura del FolderModal e usarlo qui al posto di usare direttamente CreateFolderMinimal.
  return (
    <div
      className="w-full aspect-square relative bg-zinc-400 dark:bg-zinc-800"
      role="button"
      onClick={() => setClicked(true)}
    >
      {" "}
      <IoMdAdd
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold z-10 text-white"
        size={35}
      />
      {clicked && (
        <CreateFolderMinimal
          inputRef={createFolderInputRef}
          handleCreateFolder={handleCreateFolder}
        />
      )}
    </div>
  );
};

export default CreateFolderPreviewSquare;
