export default (state = [{ label: 'w', isActive: true }], action) => {
  switch (action.type) {
    case 'MAIN_FORM_REGISTER_LINKS': {
      let newState = []
      action.payload.forEach((label, index) => {
        const truth = index === 0 ? true : false // Default = first link is active
        newState.push({ label: label, isActive: truth })
      })
      return newState
    }
    case 'TOGGLE_MAIN_FORM_NAV_LINK': {
      return state.map((link) => {
        if (link.label === action.payload)
          return { label: link.label, isActive: true }
        else return { label: link.label, isActive: false }
      })
    }
    default:
      return state
  }
}
