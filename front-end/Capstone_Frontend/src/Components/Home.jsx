import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  // const userData = useSelector((state) => state.userData.data);

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container `}>
        <Sidebar />
        <div className="p-8">
          <h1 className="text-4xl">Pagina Principale</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
