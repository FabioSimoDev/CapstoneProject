import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { FiUser } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useState } from "react";
import menuItems from "../utils/menuItems";
import appPreferencesMenuItems from "../utils/appPreferencesMenuItems";
import SECTIONS_COMPONENTS from "../utils/sectionComponents";

const SettinsPage = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [selectedItemId, setSelectedItemId] = useState(menuItems[0].id);
  const SectionComponent = SECTIONS_COMPONENTS[selectedItemId];

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div
        className={`min-h-screen dark:bg-black bg-white dark:text-white text-black flex`}
      >
        <Sidebar />
        <div className="w-72 overflow-y-auto h-svh px-4 py-8 border-r border-white/25 flex flex-col gap-6">
          <p className="font-bold text-xl ps-2">Impostazioni</p>
          <div className="dark:bg-[#262626] dark:border-0 dark:shadow-none shadow border py-5 px-5 rounded-lg dark:hover:bg-white/25 hover:bg-gray-100 transition-colors">
            <p className="font-bold">Centro gestione account</p>
            <small className="dark:text-white/75 text-black-75">
              Gestisci le impostazioni dell&#39;account
            </small>
            <ul className="list-none dark:text-white/75 text-black/75 flex flex-col gap-3 pt-3">
              <li className="flex gap-2 items-center text-sm">
                <FiUser size={18} />
                Dettagli personali
              </li>
              <li className="flex gap-2 items-center text-sm">
                <IoShieldCheckmarkOutline size={18} /> Password e sicurezza
              </li>
            </ul>
          </div>
          <div id="settings-options">
            <span className="dark:text-white/75 font-semibold text-sm px-4">
              Come usi EduShare
            </span>
            <ul className="flex flex-col gap-1 pt-1">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-3 flex items-center gap-2 text-md dark:hover:bg-white/25 hover:bg-gray-200 rounded-lg transition duration-100 cursor-pointer ${
                    selectedItemId === item.id
                      ? "dark:bg-white/10 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {<item.icon size={24} />} {item.label}
                </li>
              ))}
              <span className="dark:text-white/75 font-semibold text-sm px-4 py-2">
                Preferenze del sito
              </span>
            </ul>
            {appPreferencesMenuItems.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-3 flex items-center gap-2 text-md dark:hover:bg-white/25 hover:bg-gray-200 rounded-lg transition duration-100 cursor-pointer ${
                  selectedItemId === item.id
                    ? "dark:bg-white/10 bg-gray-100"
                    : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                {<item.icon size={24} />} {item.label}
              </li>
            ))}
          </div>
        </div>
        {/* schermate... */}
<<<<<<< Updated upstream
        <div className="max-w-[700px] w-full mx-auto py-9">
=======
        <div className="max-w-[700px] w-full mx-auto py-9 flex flex-col gap-9">
>>>>>>> Stashed changes
          {SectionComponent && <SectionComponent />}
        </div>
      </div>
    </div>
  );
};

export default SettinsPage;
