const BASE_URL = "http://localhost:3001";

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register"
};

export const fetchApi = async (endpoint, method, body) => {
  try {
    const response = await fetch(BASE_URL + endpoint, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw response;
    }
  } catch (error) {
    throw await error.json();
  }
};
