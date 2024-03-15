import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

export default function HashtagsDisplay({ hashtags }) {
  const navigate = useNavigate();

  if (!hashtags || hashtags.length === 0) return null;

  const displayedHashtags = hashtags.slice(0, 3);

  return (
    <small
      className="text-indigo-600 font-bold flex items-center gap-1"
      role="button"
    >
      {displayedHashtags.map((tag, index) => (
        <span
          key={index}
          className="hashtag truncate"
          onClick={() => navigate("/search/" + tag.hashtag)}
        >
          #{tag.hashtag}
        </span>
      ))}
      {hashtags.length > 3 && (
        <span className="text-lg dark:text-white text-black motion-safe:animate-bounce-slow cursor-pointer">
          +
        </span>
      )}
    </small>
  );
}

HashtagsDisplay.propTypes = {
  hashtags: PropTypes.array
};
