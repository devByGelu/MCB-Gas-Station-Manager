const { default: store } = require('../store')

function select(state) {
  return state.openedForm
}

export let openedForm 

function handleChange() {
  let previousValue = openedForm
  openedForm = select(store.getState())

}

/* const unsubscribe =  */store.subscribe(handleChange)
