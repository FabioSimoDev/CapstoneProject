import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useGetFolderPost } from "../hooks/useGetFolderPosts";
import { useQueryClient } from "@tanstack/react-query";
import LoadingDots from "./LoadingDots";

const FolderPreview = ({ folder }) => {
  const {
    data: posts,
    isLoading,
    isError,
    error
  } = useGetFolderPost(folder.id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = () => {
    if (posts?.posts?.content?.length > 0 && !isError)
      navigate("/folder/" + folder.id);
  };

  return (
    <div
      className="w-full aspect-square relative"
      role="button"
      onClick={handleClick}
    >
      {posts?.posts?.content?.length >= 4 ? (
        <div className="grid grid-cols-2">
          {posts.posts.content.slice(0, 4).map((post) => (
            <img
              key={post.id}
              src={
                post.image_url ??
                "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              }
              className="w-full object-cover aspect-square"
            />
          ))}
        </div>
      ) : (
        <img
          src={
            posts?.posts?.content?.length > 0
              ? posts?.posts?.content[0].image_url ??
                "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
          }
          alt=""
          className="w-full object-cover aspect-square"
        />
      )}

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        {isLoading && <LoadingDots />}
        {isError && (
          <button
            className="p-2 bg-red-500 rounded-md"
            onClick={() =>
              queryClient.fetchQuery({ queryKey: ["folderPost", folder.id] })
            }
          >
            Riprova
          </button>
        )}
      </div>
      <h1 className="absolute left-2 bottom-2 text-xl font-bold z-10">
        {folder.name}
      </h1>
    </div>
  );
};

FolderPreview.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
};

export default FolderPreview;
