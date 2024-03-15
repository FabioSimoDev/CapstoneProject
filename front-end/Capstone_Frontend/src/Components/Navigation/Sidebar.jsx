import { useState } from "react";
import { FiUser, FiSettings } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import NavLink from "./NavLink";
import DarkModeToggle from "../UI/DarkModeToggle";
import { LuPlusSquare } from "react-icons/lu";
import CreatePostModal from "../Modal/CreatePostModal";
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
  //TODO: rimuovere questa vecchia funzionalità in cui il menu poteva aprirsi e chiudersi.
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userData.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`flex md:flex-row flex-col ${darkMode ? "dark" : null}`}>
      <div
        className={`z-50 dark:bg-black bg-white dark:text-white text-black border-t md:border-t-0 md:border-r dark:border-white/50 border:black/25 md:min-h-screen w-full md:w-20 xl:w-80 md:space-y-6 md:py-7 py-4 px-2 fixed inset-x-0 bottom-0 md:static md:h-full transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } md:translate-y-0 transition duration-200 ease-in-out flex items-center justify-evenly md:block`}
      >
        <a
          href="#"
          className="dark:text-white text-black flex items-center space-x-2 px-4 hidden md:flex"
        >
          <img src={logo} alt="logo" width="30px" loading="lazy" />
          <span className="text-2xl font-bold hidden xl:inline-block">
            EduShare
          </span>
        </a>

        <nav className="flex items-center justify-evenly w-full md:flex-col md:gap-5 md:justify-center xl:items-start my-0">
          <NavLink
            onClick={() => navigate("/home")}
            icon={GoHomeFill}
            label="Home"
            darkMode={darkMode}
          />
          <NavLink
            onClick={() => navigate("/search")}
            icon={IoSearch}
            label="Search"
            darkMode={darkMode}
          />
          <NavLink
            onClick={() => navigate("/profile/me")}
            icon={currentUser ? null : FiUser}
            avatarURL={currentUser?.avatarURL}
            label="Profile"
            darkMode={darkMode}
          />
          <NavLink
            onClick={openModal}
            icon={LuPlusSquare}
            label="Create"
            darkMode={darkMode}
          />
          <NavLink
            onClick={() => navigate("/settings")}
            icon={FiSettings}
            label="Settings"
            darkMode={darkMode}
          />
        </nav>
        <DarkModeToggle />
      </div>
      <CreatePostModal open={isModalOpen} onClose={closeModal} />

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
