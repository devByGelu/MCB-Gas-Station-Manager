const { default: store } = require('../store')

function select(state) {
  return state.monthForms
}

export let monthForms 

function handleChange() {
  let previousValue = monthForms
  monthForms = select(store.getState())


}

/* const unsubscribe =  */store.subscribe(handleChange)
