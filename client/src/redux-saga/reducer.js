const defaultState = {
  isLogedIn: false,
};

export const reducer = function (state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_SESSION":
      state.isLogedIn = true;
      return { ...state };
    default:
      return state;
  }
};
