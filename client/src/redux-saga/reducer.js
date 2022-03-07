export const reducer = function (state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      state.count++;
      state = {...state};
      return state;
    case "DECREMENT":   
      return state;
    default:
      return state;
  }
};
