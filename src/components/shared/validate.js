const incorrectBreakdown = (target, breakdown) => {
  let total = 0
  breakdown.forEach((el) => {
    console.log(el)
    let value = parseFloat(el.quantity) * parseFloat(el.denomination)
    total = total + value
  })
  console.log("to float = " + parseFloat(target) + " " + parseFloat(total))
  return parseFloat(target) == parseFloat(total) ? false : true
}

const validate = (values) => {
  const errors = {}
  const pumpPricesArrayErrors = []
  const advanceReadingArrayErrors = []
  const dipstickArrayErrors = []
  const lastDropBreakdownArrayErrors = []
  const expensesArrayErrors = []
  const creditsalesArrayErrors = []
  const cashadvanceArrayErrors = []

  if (values.pumpPrices) {
    values.pumpPrices.forEach((pump, index) => {
      const pumpPriceErrors = {}
      const products = ["diesel", "accelrate", "jxpremium"]
      products.forEach((pName) => {
        if (!pump || !pump[pName]) {
          pumpPriceErrors[pName] = "Required"
          pumpPricesArrayErrors[index] = pumpPriceErrors
        }
      })
    })
  }
  if (pumpPricesArrayErrors.length) errors.pumpPrices = pumpPricesArrayErrors

  const pumpNumbers = [1, 2, 3, 4]
  const labels = ["Diesel", "Accelrate", "JxPremium"]
  const prefixes = ["END", "CAL", "MGN"]

  pumpNumbers.forEach((pumpNumber) => {
    labels.forEach((label) => {
      prefixes.forEach((prefix) => {
        if (!values[`pump${pumpNumber}${label}${prefix}`])
          errors[`pump${pumpNumber}${label}${prefix}`] = "Required"
      })
    })
  })
  // if (values.advanceReading)
  //   values.advanceReading.forEach((pumpReading, index) => {
  //     const advanceReadingErrors = {}
  //     let products = ['diesel', 'accelrate', 'jxpremium']
  //     products.forEach((product) => {
  //       if (!pumpReading[product]) {
  //         advanceReadingErrors[product] = 'Required'
  //         advanceReadingArrayErrors[index] = advanceReadingErrors
  //       }
  //     })
  //   })
  if (advanceReadingArrayErrors.length) {
    errors.advanceReading = advanceReadingArrayErrors
  }
  if (values.dipstick)
    values.dipstick.forEach((dip, index) => {
      const dipErrors = {}
      const fields = [
        "openingLevel",
        "closingLevel",
        "openingLiters",
        "closingLiters",
      ]
      fields.forEach((field) => {
        if (!dip[field]) {
          dipErrors[field] = "Required"
          dipstickArrayErrors[index] = dipErrors
        }
      })
    })
  if (dipstickArrayErrors.length) errors.dipstick = dipstickArrayErrors

  const dropRequiredFields = ["drops", "amountPerDrop", "lastDrop"]
  dropRequiredFields.forEach((drop) => {
    if (!values[drop]) errors[drop] = "Required"
  })

  if (values.lastDropBreakdown)
    values.lastDropBreakdown.forEach((breakdown, index) => {
      const breakdownErrors = {}
      let fields = ["denomination", "quantity"]
      fields.forEach((field) => {
        if (!breakdown[field]) {
          breakdownErrors[field] = "Required"
          lastDropBreakdownArrayErrors[index] = breakdownErrors
        }
      })
    })
  if (lastDropBreakdownArrayErrors.length)
    errors.lastDropBreakdown = lastDropBreakdownArrayErrors

  // if (values.expenses)
  //   values.expenses.forEach((expense, index) => {
  //     const expenseErrors = {}
  //     let fields = ["description", "amount"]
  //     fields.forEach((field) => {
  //       if (!expense[field]) {
  //         expenseErrors[field] = "Required"
  //         expensesArrayErrors[index] = expenseErrors
  //       }
  //     })
  //   })
  if (expensesArrayErrors.length) errors.expenses = expensesArrayErrors

  // if (values.creditsales)
  //   values.creditsales.forEach((creditsale, index) => {
  //     const creditsaleErrors = {}
  //     let fields = ["customer", "amount"]
  //     fields.forEach((field) => {
  //       if (!creditsale[field]) {
  //         creditsaleErrors[field] = "Required"
  //         creditsalesArrayErrors[index] = creditsaleErrors
  //       }
  //     })
  //   })
  if (creditsalesArrayErrors.length) errors.creditsales = creditsalesArrayErrors

  // if (values.cashadvance)
  //   values.cashadvance.forEach((ca, index) => {
  //     const caErrors = {}
  //     let fields = ["employee", "amount"]
  //     fields.forEach((field) => {
  //       if (!ca[field]) {
  //         caErrors[field] = "Required"
  //         cashadvanceArrayErrors[index] = caErrors
  //       }
  //     })
  //   })
  if (cashadvanceArrayErrors.length) errors.cashadvance = cashadvanceArrayErrors
  // pumpLiter
  // // Validate Expenses
  // if (values.expenses) {
  //   values.expenses.forEach((expense) => {
  //     if (!expense.description || !expense.amount)
  //       errors.expenses = { _error: 'Please fill-in all fields' }
  //   })
  // }
  // // Validate Drop Form
  // if (!values.lastDrop) {
  //   errors.lastDrop = { _error: `Fill-in 'Last drop'` }
  // }
  // if (!values.amountPerDrop) {
  //   errors.amountPerDrop = { _error: `Fill-in 'Amount/drop'` }
  // }
  // if (!values.drops) {
  //   errors.drops = { _error: `Fill-in '# of Drops'` }
  // }
  // if (values.lastDropBreakdown) {
  //   values.lastDropBreakdown.forEach((money, index) => {
  //     if (!money.quantity)
  //       errors.lastDropBreakdown = { _error: 'Fill-in all fields' }
  //   })
  //   if (
  //     !errors.lastDropBreakdown &&
  //     incorrectBreakdown(values.lastDrop, values.lastDropBreakdown)
  //   )
  //     errors.lastDropBreakdown = {
  //       _error: 'Breakdown does not equal to Last Drop',
  //     }
  // }
  // // DipstickReading
  // if (values.dipstick) {
  //   values.dipstick.forEach((product) => {
  //     if (
  //       !product.openinglevel ||
  //       !product.openingliters ||
  //       !product.closinglevel ||
  //       !product.closingliters
  //     )
  //       errors.dipstick = { _error: 'Fill-in all fields' }
  //   })
  // }
  // // Advance Reading form
  // if (values.advanceReading) {
  //   values.advanceReading.forEach((product) => {
  //     if (!product.diesel || !product.accelrate || !product.jxpremium)
  //       errors.advanceReading = { _error: 'Fill-in all fields' }
  //   })
  // }
  // // Form
  // // Employees
  // if (!values.Cashier || values.Cashier == -1)
  //   errors.Cashier = { _error: 'Select a cashier' }

  // if (values.pumpAttendants) {
  //   let chosen = false

  //   values.pumpAttendants.forEach((e) => {
  //     if (e.PA && e.PA !== '-1') chosen = true
  //   })
  //   if (!chosen)
  //     errors.pumpAttendants = { _error: 'Select at least one attendant' }
  // }
  // // Prices
  // if (values.pumpPrices) {
  //   const arr = [values.pumpPrices[0], values.pumpPrices[1]]
  //   arr.forEach((el) => {
  //     console.log(el)
  //     if (!el.diesel || !el.accelrate || !el.jxpremium) {
  //       errors.pumpPrices = { _error: 'Fill-in all fields' }
  //     }
  //   })
  // }
  // // Liters
  // if (values.pump1Liters) {
  //   let arr = [
  //     values.pump1Liters[0],
  //     values.pump2Liters[0],
  //     values.pump3Liters[0],
  //     values.pump4Liters[0],
  //   ]

  //   arr.forEach((el, index) => {
  //     if (
  //       !el.DieselEND ||
  //       !el.DieselCAL ||
  //       !el.DieselMGN ||
  //       !el.AccelrateEND ||
  //       !el.AccelrateCAL ||
  //       !el.AccelrateMGN ||
  //       !el.JxPremiumEND ||
  //       !el.JxPremiumCAL ||
  //       !el.JxPremiumMGN
  //     ) {
  //       if (index === 0) errors.pump1Liters = { _error: 'Fill-in all fields' }

  //       if (index === 1) errors.pump2Liters = { _error: 'Fill-in all fields' }

  //       if (index === 2) errors.pump3Liters = { _error: 'Fill-in all fields' }
  //       if (index === 3) errors.pump4Liters = { _error: 'Fill-in all fields' }
  //     }
  //   })
  // errors.pumpPrices = { _error: 'fill in!' }
  return errors
}
export default validate
