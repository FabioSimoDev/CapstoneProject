import PropTypes from "prop-types";
import { IoSearch } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const SearchInput = ({
  searchText,
  handleSearch,
  handleReset,
  defaultValue
}) => {
  return (
    <div className="relative rounded-md max-w-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] grow">
      {!searchText && (
        <IoSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 focus:outline-none" />
      )}
      <input
        type="text"
        placeholder="Search..."
        defaultValue={defaultValue}
        className={`rounded-md px-4 py-2 w-full outline-none transition-all duration-300 ${
          !searchText ? "ps-10" : ""
        }`}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchText && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          onClick={handleReset}
        >
          <MdCancel className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  defaultValue: PropTypes.string,
  handleReset: PropTypes.func,
  handleSearch: PropTypes.func,
  searchText: PropTypes.string
};

export default SearchInput;
