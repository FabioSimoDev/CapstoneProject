import PropTypes from "prop-types";
import ProfileCard from "./ProfileCard";
import PostPreview from "./PostPreview";
const SearchResult = ({ searchFilter, result }) => {
  if (searchFilter === "Profiles") {
    return (
      <div className="flex flex-col w-full">
        {result?.content?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    );
  } else if (searchFilter === "Notes" || searchFilter === "Hashtags") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
        {result?.content?.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

SearchResult.propTypes = {
  result: PropTypes.shape({
    content: PropTypes.shape({
      map: PropTypes.func
    })
  }),
  searchFilter: PropTypes.string
};

export default SearchResult;
