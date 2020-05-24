const init = [
  { selectorId: 'random-id', selected: '5eb9027bbd1448c2f68ee02f' },
  { selectorId: 'random-id2', selected: null },
]
export default (state = init, action) => {
  switch (action.type) {
    case 'SHIFT_FORM_ADD_PA':
      return [...state, { selectorId: action.payload, selected: null }]
    case 'SHIFT_FORM_MIN_PA':
      return state.filter((chooser) => chooser.selectorId !== action.payload)
    case 'SHIFT_FORM_UPDATE_PA': {
      return state.map((selector)=>{
        if (selector.selectorId===action.payload.selectorId) {
          return {...selector,selected: action.payload.selected}
        } else {
          return selector
        }
      })
    }
    default:
      return state
  }
}
