import PropTypes from "prop-types";
import { useState } from "react";
import ImageDropZone from "./ImageDropZone";
import PreviewImage from "./PreviewImage";
import useImageLoader from "../../hooks/useImageLoader";
import { pageTitles, Page } from "../../utils/createPostModalPages";
import { handleFilesAdded, saveImage } from "../../utils/imageHandler";
import { useImageCanvas } from "../../hooks/useImageCanvas";
import ModalHeader from "./ModalHeader";
import { usePostForm } from "../../hooks/usePostForm";
import { useSelector } from "react-redux";

const CreatePostModal = ({ open, onClose, children }) => {
  const { image, resetImage, loadImage, applyFilter, filters } =
    useImageLoader();
  const [currentPage, setCurrentPage] = useState(Page.CREATE_POST);
  const { canvasRefCallBack, canvasRef } = useImageCanvas(image, filters);
  const [formData, setFormData] = useState(null);
  const [postHashtags, setPostHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    mutate: submitPost,
    isLoading,
    isError: isPostError,
    error: postError
  } = usePostForm(setLoading);
  const token = useSelector((state) => state.auth.token);

  const onFilesAddedWrapper = (files) =>
    handleFilesAdded(files, loadImage, setCurrentPage);

  const saveImageWrapper = () => {
    const data = saveImage(canvasRef, setCurrentPage, setFormData);
    console.log("data:", data);
    if (data) {
      setFormData(data);
    }
  };
  console.log(isLoading);

  const nextPage = () => {
    if (currentPage === Page.CREATE_POST) {
      if (!image) {
        return;
      }
    }
    if (currentPage === Page.EDIT_IMAGE) saveImageWrapper();
    if (currentPage === Page.PUBLISH_POST) {
      if (!(formData.get("title") || formData.get("content"))) return;
      if (
        formData.get("title").trim() === "" ||
        formData.get("content").trim() === ""
      )
        return;
      submitPost({ formData: formData, token: token, hashtags: postHashtags });
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage === Page.EDIT_IMAGE) resetImage();
    setCurrentPage((prev) => prev - 1);
  };

  const renderModalContent = () => {
    switch (currentPage) {
      case Page.CREATE_POST:
        return !image ? (
          <ImageDropZone onFilesAdded={onFilesAddedWrapper} />
        ) : null;
      default:
        return (
          <PreviewImage
            currentPage={currentPage}
            applyFilter={applyFilter}
            canvasRef={canvasRefCallBack}
            postHashtags={postHashtags}
            setPostHashtags={setPostHashtags}
            formData={formData}
          />
        );
    }
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-[60] py-10 ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-zinc-800 rounded-xl shadow transition-all duration-200 ease-in-out w-4/5 h-fit relative flex flex-col ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } ${
          currentPage === Page.EDIT_IMAGE
            ? "lg:w-8/12 aspect-video"
            : currentPage === Page.CREATE_POST
            ? "lg:w-2/5 aspect-square"
            : ""
        } ${currentPage === Page.PUBLISH_POST ? "lg:w-6/12" : ""}`}
      >
        {/* HEADER MODALE */}
        <ModalHeader
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          pageTitles={pageTitles}
          isLoading={loading}
        />
        {/* CORPO DEL MODALE */}
        {renderModalContent()}
        {children}
      </div>
    </div>
  );
};

CreatePostModal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default CreatePostModal;
