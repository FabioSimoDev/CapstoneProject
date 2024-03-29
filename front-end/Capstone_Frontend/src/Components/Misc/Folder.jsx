import { useSelector } from "react-redux";
import Sidebar from "../Navigation/Sidebar";
import { useGetFolderPost } from "../../hooks/useGetFolderPosts";
import { useParams } from "react-router";
import { Fragment } from "react";
import Post from "../Posts/Post";
import PostSkeleton from "../Posts/PostSkeleton";

const Folder = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { folderId: id } = useParams();
  const { data: posts, isLoading, isError, error } = useGetFolderPost(id);
  console.log(posts?.posts?.content);
  console.log(isLoading);
  console.log(isError);
  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container `}>
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto">
          <div className="p-8 max-w-[900px] mx-auto flex flex-col items-center gap-10">
            <div className="w-[28rem] flex flex-col gap-3">
              {!isLoading && !isError && posts?.posts?.content?.length > 0 ? (
                posts.posts.content.map((post, index) => {
                  return (
                    <Fragment key={index}>
                      <Post post={post} />
                      <div className="border-t pt-2 border-black/30 dark:border-white/10"></div>
                    </Fragment>
                  );
                })
              ) : isLoading ? (
                [...Array(10)].map((u, index) => <PostSkeleton key={index} />)
              ) : isError ? (
                <span className="text-lg text-red-500">{error.message}</span>
              ) : (
                <span className="text-lg text-center">
                  Non sono presenti post.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
