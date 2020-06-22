const { default: store } = require('../store')

function select(state) {
  return state.monthForms
}

export let monthForms

function handleChange() {
  let previousValue = monthForms
  monthForms = select(store.getState())

  if (previousValue !== monthForms) {
    console.log(
      'Some deep nested property changed from',
      previousValue,
      'to',
      monthForms
    )
  }
}

/* const unsubscribe =  */store.subscribe(handleChange)
