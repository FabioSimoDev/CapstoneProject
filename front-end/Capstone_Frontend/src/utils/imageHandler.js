import { Page } from "./createPostModalPages";
import debounce from "./debounceFunc";

export const handleFilesAdded = (files, loadImage, setCurrentPage) => {
  console.log(files);
  loadImage(files[0]);
  setCurrentPage(Page.EDIT_IMAGE);
};

export const saveImage = (canvasRef, setCurrentPage, setFormData) => {
  const canvas = canvasRef.current;
  if (canvas) {
    canvas.toBlob(
      (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "modified-image.jpeg");
        console.log("formData ready for upload:", formData);
        setCurrentPage(Page.PUBLISH_POST);
        console.log("formData", formData);
        console.log("formdata dentro saveImage:", formData);
        setFormData(formData);
        return formData;
      },
      "image/jpeg",
      0.85
    );
  }
};
