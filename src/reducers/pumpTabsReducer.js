const init = [{ active: 0 }, { active: 0 }, { active: 0 }, { active: 0 }]
export default (state = {init}, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_PUMP_TAB':
      return action.payload
    default:
      return state
  }
}
