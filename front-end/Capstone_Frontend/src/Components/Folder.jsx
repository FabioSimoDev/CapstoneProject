import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useGetFolderPost } from "../hooks/useGetFolderPosts";
import { useParams } from "react-router";
import { Fragment } from "react";
import Post from "./Post";

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
              {!isLoading && !isError
                ? posts.posts.content.map((post, index) => {
                    return (
                      <Fragment key={index}>
                        <Post post={post} />
                        <div className="border-t pt-2 border-black/30 dark:border-white/10"></div>
                      </Fragment>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
