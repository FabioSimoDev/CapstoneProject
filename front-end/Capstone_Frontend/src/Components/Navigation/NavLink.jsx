import PropTypes from "prop-types";
const NavLink = ({ onClick, icon: Icon, avatarURL, label, darkMode }) => {
  return (
    <div
      className="flex items-center justify-center xl:justify-start rounded transition duration-200 xl:hover:bg-gray-300/20 px-4 w-full cursor-pointer"
      onClick={onClick}
    >
      {Icon ? (
        <Icon size={24} className="" color={darkMode ? "white" : "black"} />
      ) : (
        <div className="w-[24px] h-[24px]">
          <img
            src={avatarURL}
            className="rounded-full w-full h-full object-cover"
            alt="Profile"
          />
        </div>
      )}
      {label && (
        <a href="#" className="block py-2.5 px-4 hidden xl:block">
          {label}
        </a>
      )}
    </div>
  );
};

NavLink.propTypes = {
  avatarURL: PropTypes.string,
  darkMode: PropTypes.bool,
  icon: PropTypes.func,
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default NavLink;
