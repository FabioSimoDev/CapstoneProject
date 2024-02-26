import { PropTypes } from "prop-types";

const Modal = ({ open, onClose, children }) => {
  return (
    //"backdrop"
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-[60] py-10 ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow transition-all w-full h-full mx-[13rem] ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};
