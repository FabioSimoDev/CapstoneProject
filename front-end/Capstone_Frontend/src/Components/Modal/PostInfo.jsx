import { useEffect, useRef, useState } from "react";
import debounce from "../../utils/debounceFunc";
import { useCallback } from "react";
import { useHashtags } from "../../hooks/useHashtags";
import { PropTypes } from "prop-types";
import HashtagInput from "./HashtagInput";
import UserInfo from "./UserInfo";

export default function PostInfo({ formData, postHashtags, setPostHashtags }) {
  const [description, setDescription] = useState("");
  const titleRef = useRef();
  const [hashtagQuery, setHashtagQuery] = useState("");
  const hashtagInputRef = useRef(null);
  const { data: hashtags, error, isError } = useHashtags(hashtagQuery);

  const debouncedSearch = useCallback(
    debounce((event) => {
      setHashtagQuery(event.target.value);
    }, 500),
    []
  );

  const saveHashtag = () => {
    const newHashtag =
      hashtags?.content?.length > 0
        ? hashtags.content[0].hashtag
        : hashtagInputRef.current.value;
    setPostHashtags([...postHashtags, newHashtag]);
    hashtagInputRef.current.value = "";
  };

  useEffect(() => {
    if (formData) {
      formData.set("content", description);
    }
  }, [description, formData]);

  useEffect(() => {
    if (formData) {
      formData.set("title", titleRef?.current?.value);
    }
  }, [titleRef?.current?.value, formData]);

  return (
    <div className="flex flex-col px-5 py-3 gap-5">
      <div>
        <UserInfo />
        <div className="flex flex-col">
          <input
            type="text"
            name="title-input"
            id="post-title-input"
            className="mt-2 bg-transparent outline-none h-fit py-2 border-b dark:border-white/10 rounded"
            placeholder="Titolo"
            ref={titleRef}
          />
          <textarea
            name="post description"
            id="post-description"
            cols="30"
            rows="5"
            maxLength={300}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Scrivi una didascalia..."
            className="resize-none bg-transparent outline-none rounded-xl h-fit py-2"
          ></textarea>
          <span className="ms-auto text-xs text-white/50">
            {description.length}/300
          </span>
        </div>
      </div>
      <HashtagInput
        onSave={saveHashtag}
        debouncedSearch={debouncedSearch}
        hashtags={hashtags}
        hashtagInputRef={hashtagInputRef}
        isError={isError}
        error={error}
      />
    </div>
  );
}

PostInfo.propTypes = {
  formData: PropTypes.object,
  postHashtags: PropTypes.array,
  setPostHashtags: PropTypes.func
};
