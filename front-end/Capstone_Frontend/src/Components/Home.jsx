import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
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
