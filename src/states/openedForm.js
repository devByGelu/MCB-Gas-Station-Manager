const { default: store } = require('../store')

function select(state) {
  return state.openedForm
}

export let openedForm

function handleChange() {
  let previousValue = openedForm
  openedForm = select(store.getState())

  if (previousValue !== openedForm) {
    console.log(
      'Some deep nested property changed from',
      previousValue,
      'to',
      openedForm
    )
  }
}

/* const unsubscribe =  */store.subscribe(handleChange)
