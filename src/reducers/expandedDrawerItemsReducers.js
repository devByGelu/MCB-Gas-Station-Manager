const initialState = [true, false, false, false];

export default (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_MENU_ITEM": {
      return state.map((item, index) => {
        if (index === action.payload) {
          return !item;
        }
        return item;
      });
    }
    default:
      return state;
  }
};
