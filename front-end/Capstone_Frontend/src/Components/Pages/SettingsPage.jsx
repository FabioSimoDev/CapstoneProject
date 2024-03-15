import { useSelector } from "react-redux";
import Sidebar from "../Navigation/Sidebar";
import { FiUser, FiMenu } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useState } from "react";
import menuItems from "../../utils/menuItems";
import appPreferencesMenuItems from "../../utils/appPreferencesMenuItems";
import SECTIONS_COMPONENTS from "../../utils/sectionComponents";

const combinedMenuItems = [
  { type: "separator", label: "Come usi EduShare" },
  ...menuItems,
  { type: "separator", label: "Preferenze del sito" },
  ...appPreferencesMenuItems
];

const SettinsPage = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [selectedItemId, setSelectedItemId] = useState(menuItems[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const SectionComponent = SECTIONS_COMPONENTS[selectedItemId];

  const handleItemClick = (id) => {
    if (id === "logOut") {
      localStorage.removeItem("TOKEN");
      location.reload();
    }
    setSelectedItemId(id);
    setIsMenuOpen(false);
  };

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container`}>
        <Sidebar />
        <div className="md:hidden absolute top-4 left-4 z-50">
          <FiMenu
            size={24}
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        <div
          className={`fixed top-0 left-0 z-40 transform dark:bg-black ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-72 md:translate-x-0 overflow-y-auto h-svh px-4 py-8 border-r border-white/25 md:flex md:flex-col md:shrink-0 sm:shrink-0 gap-6`}
        >
          <p className="font-bold text-xl ps-2">Impostazioni</p>
          <div className="dark:bg-[#262626] dark:border-0 dark:shadow-none shadow border py-5 px-5 rounded-lg dark:hover:bg-white/25 hover:bg-gray-100 transition-colors">
            <p className="font-bold">Centro gestione account</p>
            <small className="dark:text-white/75 text-black">
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
            <ul className="flex flex-col gap-1 pt-1">
              {combinedMenuItems.map((item, index) => {
                if (item.type === "separator") {
                  return (
                    <span
                      key={index}
                      className={`dark:text-white/75 font-semibold text-sm px-4 ${
                        index === 0 ? "" : "py-2"
                      }`}
                    >
                      {item.label}
                    </span>
                  );
                } else {
                  return (
                    <li
                      key={index}
                      role="button"
                      tabIndex={0}
                      aria-label={`Seleziona ${item.label}`}
                      className={`px-4 py-3 flex items-center gap-2 text-md dark:hover:bg-white/25 hover:bg-gray-200 rounded-lg transition duration-100 cursor-pointer ${
                        selectedItemId === item.id
                          ? "dark:bg-white/10 bg-gray-100"
                          : ""
                      }`}
                      onClick={() => handleItemClick(item.id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleItemClick(item.id)
                      }
                    >
                      {<item.icon size={24} />} {item.label}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        {/* schermate... */}
        <div className="max-w-[700px] w-full mx-auto py-9 flex flex-col min-w-0 gap-9 px-5">
          {SectionComponent && <SectionComponent />}
        </div>
      </div>
    </div>
  );
};

export default SettinsPage;
