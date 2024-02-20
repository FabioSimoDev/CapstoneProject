import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { getAllPosts } from "../Redux/actions/postActions";
import Post from "./Post";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const token = useSelector((state) => state.auth.token);
  const allPosts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData.data);

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts(token));
    }
  }, [token]);

  if (!allPosts) return null;

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container `}>
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto">
          <div className="p-8 max-w-[900px] mx-auto flex flex-col items-center">
            <h1 className="text-4xl">Pagina Principale</h1>
            {allPosts ? <h1>{allPosts.content[1].title}</h1> : null}
            {console.log(allPosts.content[0].title)}
            <div className="w-96">
              {allPosts.content.map((post, index) => (
                <Post key={index} post={allPosts.content[index]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
