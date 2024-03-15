import PropTypes from "prop-types";
import { useGetFolderPost } from "../../hooks/useGetFolderPosts";
const FolderPreviewMinimal = ({ folder, postId, closeModal, addPost }) => {
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts
  } = useGetFolderPost(folder.id);
  console.log(folder);
  return (
    <div
      className="flex gap-5 items-center shadow p-4 min-w-64"
      role="button"
      onClick={() => {
        addPost({ folderId: folder.id, postId: postId });
        closeModal();
      }}
    >
      <div className="w-14 aspect-square">
        <img
          src={
            posts?.posts?.content?.length > 0
              ? posts?.posts?.content[0].image_url ??
                "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
          }
          alt="folder image"
          className="w-full object-cover aspect-square rounded"
        />
      </div>
      <div>{folder.name}</div>
    </div>
  );
};

FolderPreviewMinimal.propTypes = {
  folder: PropTypes.object,
  addPost: PropTypes.func
};

export default FolderPreviewMinimal;
