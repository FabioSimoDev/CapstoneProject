import { PropTypes } from "prop-types";

export default function HashtagsDisplay({ hashtags }) {
  if (!hashtags || hashtags.length === 0) return null;
  const displayedHashtags = hashtags.slice(0, 3);

  return (
    <small className="text-indigo-600 font-bold flex items-center gap-1">
      {displayedHashtags.map((tag, index) => (
        <span key={index} className="hashtag">
          #{tag.hashtag}
        </span>
      ))}
      {hashtags.length > 3 && (
        <span className="text-lg dark:text-white text-black motion-safe:animate-bounce-slow">
          +
        </span>
      )}
    </small>
  );
}

HashtagsDisplay.propTypes = {
  hashtags: PropTypes.array
};
