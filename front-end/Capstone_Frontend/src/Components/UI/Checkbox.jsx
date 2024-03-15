/* eslint-disable react/prop-types */
import { IoMdCheckmark } from "react-icons/io";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer gap-2">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-6 h-6 border border-gray-300 rounded-md bg-white dark:bg-black shadow-sm flex items-center justify-center">
          {checked && <IoMdCheckmark />}
        </div>
      </div>
      <span className="ml-2 dark:text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
