import { useNavigate } from "react-router";
import { useGetFolderPost } from "../hooks/useGetFolderPosts";

const FolderPreview = ({ folder }) => {
  const {
    data: posts,
    isLoading,
    isError,
    error
  } = useGetFolderPost(folder.id);
  const navigate = useNavigate();

  return (
    <div
      className="w-full aspect-square relative"
      role="button"
      onClick={() => navigate("/folder/" + folder.id)}
    >
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
      <div className="absolute inset-0 bg-black/60"></div>
      <h1 className="absolute left-2 bottom-2 text-xl font-bold z-10">
        {folder.name}
      </h1>
    </div>
  );
};

export default FolderPreview;
