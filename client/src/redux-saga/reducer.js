const defaultState = {
  isLogedIn: true,
  isTopicFormSubmitted: false,

  // student dashboard
  currentDeletedTopic: {topicId:"sdf"},
};

export const reducer = function (state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_SESSION":
      state.isLogedIn = true;
      return { ...state };
    case "ACTIVE_STATUS_TOPIC_FORM":
      state.isTopicFormSubmitted = !state.isTopicFormSubmitted;
      return { ...state };
    case "RESET_STATUS_TOPIC_FORM":
      state.isTopicFormSubmitted = false;
      return { ...state };
    case "UPDATE_CURRENT_DELETED_TOPIC":
      state.currentDeletedTopic = action.payload;
      return { ...state };
    default:
      return state;
  }
};
