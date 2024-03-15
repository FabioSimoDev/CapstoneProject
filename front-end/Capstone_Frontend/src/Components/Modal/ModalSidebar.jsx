import Filters from "./Filters";
import { PropTypes } from "prop-types";
import { Page } from "../../utils/createPostModalPages";
import PostInfo from "./PostInfo";

export default function ModalSidebar({
  applyFilter,
  currentPage,
  formData,
  postHashtags,
  setPostHashtags
}) {
  const renderSideBarContent = () => {
    switch (currentPage) {
      case Page.EDIT_IMAGE:
        return <Filters applyFilter={applyFilter} />;
      case Page.PUBLISH_POST:
        return (
          <PostInfo
            formData={formData}
            postHashtags={postHashtags}
            setPostHashtags={setPostHashtags}
          />
        );
    }
  };
  return <div className="w-full h-full">{renderSideBarContent()}</div>;
}

ModalSidebar.propTypes = {
  applyFilter: PropTypes.func,
  formData: PropTypes.object,
  currentPage: PropTypes.number,
  postHashtags: PropTypes.array,
  setPostHashtags: PropTypes.func
};
