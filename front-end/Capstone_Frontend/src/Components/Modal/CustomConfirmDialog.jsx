import PropTypes from "prop-types";
const CustomConfirmDialog = ({ open, onClose, onConfirm, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center transition-colors duration-300 z-[60] py-10 confirm-dialog ${
        open ? "visible backdrop-blur" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {" "}
        <div className="dark:bg-zinc-700 bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mx-4 md:relative shadow-lg">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <i className="bx bx-error text-3xl">&#9888;</i>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold text-black dark:invert">Warning!</p>
              {children}
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              id="confirm-delete-btn"
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              id="confirm-cancel-btn"
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-indigo-600 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1 dark:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomConfirmDialog.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  open: PropTypes.bool
};

export default CustomConfirmDialog;
