import { PropTypes } from "prop-types";

export default function PostContent({
  username,
  content,
  totalComments,
  openModal
}) {
  return (
    <div className="flex flex-col gap-2">
      <small>
        <span className="font-semibold">{username}:</span> {content}
      </small>
      {totalComments > 0 && (
        <small
          role="button"
          className="opacity-50 text-[0.900rem] font-medium"
          onClick={openModal}
        >
          Mostra tutti e {totalComments} commenti
        </small>
      )}
    </div>
  );
}

PostContent.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string,
  totalComments: PropTypes.number,
  openModal: PropTypes.func
};
