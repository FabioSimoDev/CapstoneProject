import ModifyProfile from "../Components/Settings/ModifyProfile";
import AccountPrivacy from "../Components/Settings/AccountPrivacy";
import BlockedAccounts from "../Components/Settings/BlockedAccounts";
import CommentsSettings from "../Components/Settings/CommentsSettings";
import ColorThemeSettings from "../Components/UI/ColorThemeSettings";
import RememberMeSettings from "../Components/Settings/RememberMeSettings";
import PersonalInfoResume from "../Components/Settings/PersonalInfoResume";

const SECTIONS_COMPONENTS = {
  modificaProfilo: ModifyProfile,
  privacyAccount: AccountPrivacy,
  utentiBloccati: BlockedAccounts,
  commentsSettings: CommentsSettings,
  colorTheme: ColorThemeSettings,
  rememberMe: RememberMeSettings,
  personalInfo: PersonalInfoResume
};

export default SECTIONS_COMPONENTS;
