const BASE_URL = "http://localhost:3001";

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register"
};

export const USERS_DATA_ENDPOINT = {
  PERSONAL_DATA: "/users/me",
  BY_ID_DATA: "/users/"
};

export const USER_PROFILE_ENDPOINT = {
  UPLOAD_AVATAR: "/users/me/upload",
  UPDATE_USER: "/users/me/updateProfile"
};

export const POSTS_ENDPOINTS = {
  GET_PERSONAL_POSTS: "/posts/me",
  GET_ALL_POSTS: "/posts"
};

export const fetchApi = async (
  endpoint,
  method,
  body,
  authenticationHeader
) => {
  try {
    const options = {
      method,
      headers: {
        Authorization: "Bearer " + authenticationHeader
      }
    };

    if (method !== "GET") {
      if (endpoint !== USER_PROFILE_ENDPOINT.UPLOAD_AVATAR) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      } else {
        options.body = body;
      }
    }

    const response = await fetch(BASE_URL + endpoint, options);

    if (response.ok) {
      return await response.json();
    } else {
      throw response;
    }
  } catch (error) {
    console.log(await error);
    throw await error.json();
  }
};
