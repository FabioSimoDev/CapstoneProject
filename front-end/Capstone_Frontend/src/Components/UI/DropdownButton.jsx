import PropTypes from "prop-types";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
const DropdownButton = ({ options, onSelect, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption);

  const handleSelect = (option) => {
    setIsOpen(false);
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="relative flex text-left z-50">
      <div>
        <button
          type="button"
          className="flex h-full justify-between items-center w-full rounded-md shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:bg-[#2b2a33] dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected.label}
          <FaAngleDown />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 top-10 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#2b2a33]">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white px-7 hover:bg-slate-200 dark:hover:bg-indigo-700/10 ${
                  option.selected ? "font-bold" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DropdownButton.propTypes = {
  defaultOption: PropTypes.object,
  onSelect: PropTypes.func,
  options: PropTypes.array
};

export default DropdownButton;
