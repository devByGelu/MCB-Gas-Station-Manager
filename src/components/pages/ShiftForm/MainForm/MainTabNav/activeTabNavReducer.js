
const init = 0 
export default (state =  init , action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB': 
      return action.payload.tabIndex 
    default:
      return state
  }}