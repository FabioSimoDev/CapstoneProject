import ModifyProfile from "../Components/ModifyProfile";
import AccountPrivacy from "../Components/AccountPrivacy";
import BlockedAccounts from "../Components/BlockedAccounts";
import CommentsSettings from "../Components/CommentsSettings";
import ColorThemeSettings from "../Components/ColorThemeSettings";
import RememberMeSettings from "../Components/RememberMeSettings";
import PersonalInfoResume from "../Components/PersonalInfoResume";

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
