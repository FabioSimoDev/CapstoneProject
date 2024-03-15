import { CgProfile } from "react-icons/cg";
import { BiBlock } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FiShield } from "react-icons/fi";
import { IoLockClosedOutline, IoChatbubbleOutline } from "react-icons/io5";

const menuItems = [
  {
    id: "modificaProfilo",
    label: "Modifica profilo",
    icon: CgProfile
  },
  {
    id: "privacyAccount",
    label: "Privacy dell'account",
    icon: IoLockClosedOutline
  },
  {
    id: "utentiBloccati",
    label: "Utenti bloccati",
    icon: BiBlock
  },
  {
    id: "commentsSettings",
    label: "Commenti",
    icon: IoChatbubbleOutline
  },
  {
    id: "personalInfo",
    label: "Dettagli personali",
    icon: HiOutlineNewspaper
  },
  {
    id: "passwordAndSecurity",
    label: "Password e sicurezza",
    icon: FiShield
  }
];

export default menuItems;
