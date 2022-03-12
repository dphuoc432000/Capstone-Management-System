const defaultState = {
    user: {
        firstName: "Long",
        lastName: "Nguyen",
        role: "Morderator",
    },
    isLogedIn: true,
    isTopicFormSubmitted: false,
    theme: 0,

    // student dashboard
    currentDeletedItem: { topicId: "sdf" },
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
        case "UPDATE_CURRENT_DELETED_ITEM":
            state.currentDeletedItem = action.payload;
            return { ...state };
        case "UPDATE_THEME":
            state.theme = action.payload;
            return { ...state };
        default:
            return state;
    }
};
