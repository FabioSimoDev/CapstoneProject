import { Page } from "../../utils/createPostModalPages";
import ModalSidebar from "./ModalSidebar";
import { PropTypes } from "prop-types";

const PreviewImage = ({
  applyFilter,
  canvasRef,
  currentPage,
  formData,
  postHashtags,
  setPostHashtags
}) => {
  return (
    <div className="flex md:flex-row flex-col h-full">
      <div
        className={`flex aspect-square shrink-0 transition-all ${
          currentPage === Page.PUBLISH_POST ? "w-7/12" : ""
        }`}
      >
        <div className="h-full w-full aspect-square shrink-0">
          <canvas
            className="object-cover w-full aspect-square"
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
      <div className="w-full">
        <ModalSidebar
          applyFilter={applyFilter}
          currentPage={currentPage}
          formData={formData}
          postHashtags={postHashtags}
          setPostHashtags={setPostHashtags}
        />
      </div>
    </div>
  );
};
PreviewImage.displayName = "PreviewImage";

PreviewImage.propTypes = {
  applyFilter: PropTypes.func,
  canvasRef: PropTypes.func,
  currentPage: PropTypes.number,
  formData: PropTypes.object,
  postHashtags: PropTypes.array,
  setPostHashtags: PropTypes.func
};

export default PreviewImage;
