import { useSelector } from "react-redux";
import Sidebar from "../Navigation/Sidebar";
import { Fragment } from "react";
import Post from "../Posts/Post";
import PostSkeleton from "../Posts/PostSkeleton";
import { usePostsQuery } from "../../hooks/usePostsQuery";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const token = useSelector((state) => state.auth.token);
  const { data: allPosts, isLoading, isError } = usePostsQuery(token);
  // const userData = useSelector((state) => state.userData.data);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getAllPosts(token));
  //   }
  // }, [token]);

  // if (!allPosts) return null;

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container `}>
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto">
          <div className="p-8 max-w-[900px] mx-auto flex flex-col items-center gap-10">
            <h1 className="text-4xl">Pagina Principale</h1>
            <div className="sm:w-[28rem] w-[20rem] flex flex-col gap-3">
              {!isLoading && !isError ? (
                allPosts?.content?.map((post, index) => (
                  <Fragment key={index}>
                    <Post post={post} />
                    <div className="border-t pt-2 border-black/30 dark:border-white/10"></div>
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col gap-11">
                  {[...Array(10)].map((u, index) => (
                    <PostSkeleton key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
