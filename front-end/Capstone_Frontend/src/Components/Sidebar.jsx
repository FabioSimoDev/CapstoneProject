import { useState } from "react";
import { FiMenu, FiX, FiUser, FiSettings, FiMoon, FiSun } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../Redux/actions/themeActions";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);

  return (
    <div className={`flex md:flex-row flex-col ${darkMode ? "dark" : null}`}>
      <div
        className={`dark:bg-black bg-white dark:text-white text-black border-t md:border-t-0 md:border-r dark:border-white/50 border:black/25 md:min-h-screen w-full md:w-20 lg:w-80 md:space-y-6 md:py-7 py-4 px-2 fixed inset-x-0 bottom-0 md:static md:h-full transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } md:translate-y-0 transition duration-200 ease-in-out flex items-center justify-evenly md:block`}
      >
        <a
          href="#"
          className="dark:text-white text-black flex items-center space-x-2 px-4 hidden md:flex"
        >
          <img src={logo} alt="" width={30} />
          <span className="text-2xl font-bold hidden lg:inline-block">
            EduShare
          </span>
        </a>

        <nav className="flex items-center justify-evenly w-full md:flex-col md:gap-5 md:justify-center lg:items-start my-0">
          <div
            id="sidebar-home-link-container"
            className="flex items-center justify-center lg:justify-start rounded transition duration-200 lg:hover:bg-gray-300/20 px-4 w-full cursor-pointer"
          >
            <GoHomeFill
              size={24}
              className=""
              color={darkMode ? "white" : "black"}
            />
            <a href="#" className="block py-2.5 px-4 hidden lg:block">
              Home
            </a>
          </div>
          <div
            id="sidebar-profile-link-container"
            className="flex items-center justify-center lg:justify-start rounded transition duration-200 lg:hover:bg-gray-300/20 px-4 w-full cursor-pointer"
          >
            {userData ? (
              <img
                width={24}
                src={userData?.avatarURL}
                className="rounded-full"
              ></img>
            ) : (
              <FiUser
                size={24}
                className=""
                color={darkMode ? "white" : "black"}
              />
            )}

            <a href="#" className="block py-2.5 px-4 hidden lg:block">
              Profile
            </a>
          </div>
          <div
            id="sidebar-settings-link-container"
            className="flex items-center justify-center lg:justify-start rounded transition duration-200 lg:hover:bg-gray-300/20 px-4 w-full cursor-pointer"
          >
            <FiSettings
              size={24}
              className=""
              color={darkMode ? "white" : "black"}
            />
            <a href="#" className="block py-2.5 px-4 hidden lg:block">
              Settings
            </a>
          </div>
        </nav>

        <button
          onClick={() => dispatch(setDarkMode(!darkMode))}
          className="lg:flex lg:mx-0 mx-auto items-center space-x-2 px-4 hidden"
        >
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          <span className="hidden lg:block">
            Switch to {darkMode ? "Light" : "Dark"} Mode
          </span>
        </button>
      </div>

      {/* <button
        className="text-white md:hidden p-4 fixed bottom-0 right-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FiX size={24} color={darkMode ? "white" : "black"} />
        ) : (
          <FiMenu size={24} color={darkMode ? "white" : "black"} />
        )}
      </button> */}
    </div>
  );
};

export default Sidebar;
