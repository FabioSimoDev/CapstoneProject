import { TbSunMoon } from "react-icons/tb";
import { IoIosLogIn } from "react-icons/io";
import { MdLogout } from "react-icons/md";

const appPreferencesMenuItems = [
  {
    id: "colorTheme",
    label: "Tema colori",
    icon: TbSunMoon
  },
  {
    id: "rememberMe",
    label: "Ricordami",
    icon: IoIosLogIn
  },
  {
    id: "logOut",
    label: "Esci",
    icon: MdLogout
  }
];

export default appPreferencesMenuItems;
