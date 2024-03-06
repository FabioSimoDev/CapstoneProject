import {
  BASE_URL,
  HASHTAGS_ENDPOINTS,
  POSTS_ENDPOINTS,
  USERS_DATA_ENDPOINT
} from "./backEndUtils";

export const fetchResult = async (query, filter, token) => {
  if (!query || !filter) return [];
  let url = `${BASE_URL + POSTS_ENDPOINTS.SEARCH_BY_TITLE}${query}`;

  if (filter.toLowerCase() === "hashtags") {
    url = `${
      BASE_URL + HASHTAGS_ENDPOINTS.GET_POSTS_BY_HASHTAG
    }?hashtag=${query}`;
  } else if (filter.toLowerCase() === "profiles") {
    url = `${BASE_URL + USERS_DATA_ENDPOINT.GET_BY_USERNAME}${query}`;
  }
  try {
    const response = await fetch(url, {
      headers: { Authorization: "Bearer " + token }
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch ${filter}: ` + error.message);
  }
};
