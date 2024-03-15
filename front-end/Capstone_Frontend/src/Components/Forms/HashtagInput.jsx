import { PropTypes } from "prop-types";

export default function HashtagInput({
  onSave,
  debouncedSearch,
  hashtags,
  hashtagInputRef,
  isError,
  error
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 py-3">
      <label htmlFor="hashtag-searchbar">Aggiungi hashtags:</label>
      <small className="text-xs opacity-50">Invio per salvare</small>
      <input
        type="search"
        name="hashtag searchbar"
        id="hashtag-searchbar"
        className="outline-none rounded-md"
        onKeyDown={handleKeyDown}
        onChange={debouncedSearch}
        ref={hashtagInputRef}
      />
      {hashtags?.content?.length > 0 && !isError && (
        <ul
          id="search-results"
          className="list-none mt-2 p-2 bg-black overflow-y-auto max-h-[100px] divide-y dark:divide-white/50"
        >
          {hashtags?.content.map((hashtag, index) => (
            <li key={index} className="search-result text-sm w-full">
              {hashtag.hashtag}
            </li>
          ))}
        </ul>
      )}
      {isError && <span className="text-xs text-red-300">{error.message}</span>}
    </div>
  );
}

HashtagInput.propTypes = {
  onSave: PropTypes.func,
  debouncedSearch: PropTypes.func,
  hashtags: PropTypes.object,
  isError: PropTypes.bool,
  error: PropTypes.object
};
