export default (state = '', action) => {
    switch (action.type) {
      case 'SHIFTFORM_DATE_SELECTED':
        return action.payload
      default:
        return state
    }
  }