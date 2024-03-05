import { PropTypes } from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";

export default function ModalHeader({
  currentPage,
  nextPage,
  prevPage,
  pageTitles
}) {
  return (
    <div
      className={`${!currentPage === 0 ? "absolute" : ""} inset-x-4 inset-y-0`}
    >
      <div className="w-full border-b border-black/50 dark:border-white/30 flex items-center py-3 justify-between px-4">
        <FaArrowLeft size={24} onClick={prevPage} />
        <span className="font-bold">{pageTitles[currentPage]}</span>
        <button className="text-indigo-500" onClick={nextPage}>
          Avanti
        </button>
      </div>
    </div>
  );
}

ModalHeader.propTypes = {
  currentPage: PropTypes.number,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  pageTitles: PropTypes.object
};
