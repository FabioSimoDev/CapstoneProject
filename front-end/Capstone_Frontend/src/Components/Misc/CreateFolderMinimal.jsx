import PropTypes from "prop-types";
const CreateFolderMinimal = ({ inputRef, handleCreateFolder }) => {
  return (
    <div className="flex gap-5 items-center shadow p-4 min-w-64">
      <div className="w-9 aspect-square flex items-center justify-center border-r border-white/30 pr-4">
        <p
          className="rounded bg-transparent font-bold text-xl h-fit"
          draggable={false}
        >
          +
        </p>
      </div>
      <input
        type="text"
        className="w-full rounded bg-transparent outline-none"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateFolder();
          }
        }}
      />
    </div>
  );
};

export default CreateFolderMinimal;

CreateFolderMinimal.propTypes = {
  inputRef: PropTypes.object
};
