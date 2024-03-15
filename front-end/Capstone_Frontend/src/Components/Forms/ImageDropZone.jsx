import PropTypes from "prop-types";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";

const ImageDropZone = ({ onFilesAdded }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = [...e.dataTransfer.files];
    onFilesAdded(files);
  };

  const handleFileInputChange = (e) => {
    const files = [...e.target.files];
    onFilesAdded(files);
  };

  return (
    <div
      className={`h-full flex justify-center items-center z-50 ${
        dragging ? "bg-gray-300" : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="z-10">
        <CiImageOn size={80} opacity={0.7} className="mx-auto mb-3" />
        <label htmlFor="fileInput" role="button">
          <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg">
            Drop here or{" "}
            <span className="text-indigo-500 font-semibold">
              click to select
            </span>
          </div>
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileInputChange}
          multiple
        />
      </div>
    </div>
  );
};

ImageDropZone.propTypes = {
  onFilesAdded: PropTypes.func
};

export default ImageDropZone;
