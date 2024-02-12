export const ActionTypes = {
  SET_DARK_MODE: "SET_DARK_MODE"
};

export const setDarkMode = (bool) => ({
  type: ActionTypes.SET_DARK_MODE,
  payload: bool
});
