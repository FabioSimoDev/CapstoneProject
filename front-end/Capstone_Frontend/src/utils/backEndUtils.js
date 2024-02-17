const BASE_URL = "http://localhost:3001";

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register"
};

export const USERS_DATA_ENDPOINT = {
  PERSONAL_DATA: "/users/me"
};

export const USER_PROFILE_ENDPOINT = {
  UPLOAD_AVATAR: "/users/me/upload"
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
        "Content-Type": "application/json",
        Authorization: "Bearer " + authenticationHeader
      }
    };

    if (method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(BASE_URL + endpoint, options);

    if (response.ok) {
      return await response.json();
    } else {
      throw response;
    }
  } catch (error) {
    throw await error.json();
  }
};
