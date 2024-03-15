import { FiSun, FiMoon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../Redux/actions/themeActions";

const DarkModeToggle = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setDarkMode(!darkMode))}
      className="xl:flex xl:mx-0 mx-auto items-center space-x-2 px-4 hidden"
    >
      {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      <span className="hidden xl:block">
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </span>
    </button>
  );
};

export default DarkModeToggle;
