const init = {
  signInMode: true,
};
export default (state = init, action) => {
  switch (action.type) {
    case "TOGGLE_SIGN_IN_MODE": {
      return {
        ...state,
        signInMode: !state.signInMode,
      };
    }
    default:
      return state;
  }
};
