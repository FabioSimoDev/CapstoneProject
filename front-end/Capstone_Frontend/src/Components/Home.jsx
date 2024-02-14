import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { loadUserData } from "../Redux/actions/userDataActions";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const userData = useSelector((state) => state.userData.data);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadUserData(token));
    }
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div
        className={`min-h-screen dark:bg-black bg-white dark:text-white text-black flex `}
      >
        <Sidebar />
        <div className="p-8">
          <h1 className="text-4xl">Pagina Principale</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
