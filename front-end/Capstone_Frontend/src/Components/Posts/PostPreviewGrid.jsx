import PropTypes from "prop-types";
import PostPreview from "./PostPreview";
function PostPreviewGrid({ posts }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 py-4">
      {posts.map((post) => {
        return <PostPreview post={post} key={post.id} />;
      })}
    </div>
  );
}

PostPreviewGrid.propTypes = {
  posts: PropTypes.shape({
    map: PropTypes.func
  })
};

export default PostPreviewGrid;
