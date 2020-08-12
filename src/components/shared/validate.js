const validate = (values) => {
  let errors = {};
  const pumpAttendantsArrayErrors = [];
  const expensesArrayErrors = [];
  const creditsalesArrayErrors = [];
  const cashadvanceArrayErrors = [];
  const products = ["diesel", "accelrate", "jxpremium"];
  // New
  // Basic information
  const requiredFields = ["shiftDate", "shift", "cashier"];
  requiredFields.forEach((field) => {
    if (!values[field]) errors[field] = "Required";
  });
  if (values.pumpAttendants) {
    if (!values.pumpAttendants.find((emp) => emp > 0))
      pumpAttendantsArrayErrors[0] = "Required";
    let pumpAttendants = values.pumpAttendants.filter(
      (pa) => pa !== {} || pa !== "" || pa !== null
    );
    if (pumpAttendants[0] === values.cashier)
      pumpAttendantsArrayErrors[0] = "Duplicate";
    for (let i = 0; i < pumpAttendants.length; i++) {
      for (let j = i + 1; j < pumpAttendants.length; j++) {
        if (
          (pumpAttendants[i] === pumpAttendants[j] ||
            pumpAttendants[j] === values.cashier) &&
          parseInt(pumpAttendants[i]) >= 0
        )
          pumpAttendantsArrayErrors[j] = "Duplicate";
      }
    }
  }

  if (!values.group1) errors.group1 = { diesel: "Required" };
  if (values.group1) {
    let elGroupErrors = {};
    products.forEach((field) => {
      const elErrors = {};
      if (!values.group1[field]) {
        elErrors[field] = "Required";
        elGroupErrors = { ...elGroupErrors, ...elErrors };
      } else if (parseFloat(values.group1[field]) <= parseFloat(0)) {
        elErrors[field] = "Invalid value";
        elGroupErrors = { ...elGroupErrors, ...elErrors };
      } else if (parseFloat(values.group1[field]) > parseFloat(100)) {
        elErrors[field] = "Invalid value";
        elGroupErrors = { ...elGroupErrors, ...elErrors };
      }
    });
    if (Object.keys(elGroupErrors).length) errors.group1 = elGroupErrors;
  }
  if (!values.group2) errors.group2 = { diesel: "Required" };
  if (values.group2) {
    let elGroupErrors = {};
    products.forEach((field) => {
      const elErrors = {};
      if (!values.group2[field]) {
        elErrors[field] = "Required";
        elGroupErrors = { ...elGroupErrors, ...elErrors };
      } else if (parseFloat(values.group2[field]) <= parseFloat(0)) {
        elErrors[field] = "Invalid value";
        elGroupErrors = { ...elGroupErrors, ...elErrors };
      } else if (parseFloat(values.group2[field]) > parseFloat(100)) {
        elErrors[field] = "Invalid value";
        elGroupErrors = { ...elGroupErrors, ...elErrors };
      }
    });
    if (Object.keys(elGroupErrors).length) errors.group2 = elGroupErrors;
    console.log(JSON.stringify(Object.keys(elGroupErrors).length));
  }
  const validatePumpInfo = (pump) => {
    if (!values[pump]) errors[pump] = "Required";
    if (values[pump]) {
      let errors1 = {};
      products.forEach((product) => {
        const errors2 = {};
        if (!values[pump][product]) {
          errors2[product] = "Required";
          errors1 = { ...errors1, ...errors2 };
        }
      });
      errors[pump] = errors1;
    }
    products.forEach((product) => {
      if (values[pump] && values[pump][product]) {
        let errors3 = {};
        let nestedFields = ["advRd", "end", "beg", "mgn"];
        nestedFields.forEach((field) => {
          const errors4 = {};
          if (!values[pump][product][field] && field !== "advRd") {
            errors4[field] = "Required";
            errors3 = { ...errors3, ...errors4 };
          } else {
            if (
              field === "advRd" &&
              parseFloat(values[pump][product][field]) > parseFloat(9.99)
            ) {
              errors4[field] = "Invalid";
              errors3 = { ...errors3, ...errors4 };
            }
            if (
              (field === "end" || field === "beg") &&
              parseFloat(values[pump][product][field]) > parseFloat(999999.999)
            ) {
              errors4[field] = "Invalid";
              errors3 = { ...errors3, ...errors4 };
            }
            if (
              (field === "cal" || field === "mgn") &&
              parseFloat(values[pump][product][field]) > parseFloat(99.9)
            ) {
              errors4[field] = "Invalid";
              errors3 = { ...errors3, ...errors4 };
            }
          }
        });
        errors[pump][product] = errors3;
      }
    });
    if (values.dropForm) {
      let dropFormErrors = {};
      let subFields = ["amtPerDrop"];
      subFields.forEach((field) => {
        let error = {};
        if (!values.dropForm[field]) {
          error[field] = "Required";
          dropFormErrors = { ...dropFormErrors, ...error };
        } else {
          if (
            (field === "amtPerDrop" || field === "lastDrop") &&
            parseFloat(!values.dropForm[field]) > parseFloat(999999.99)
          ) {
            error[field] = "Invalid";
            dropFormErrors = { ...dropFormErrors, ...error };
          }
        }
      });
      if (Object.keys(dropFormErrors).length) errors.dropForm = dropFormErrors;
    }
    if (!values.dropForm) {
      let error = { drops: "Required" };
      errors.dropForm = error;
    }
    if (
      values.breakdown &&
      values.dropForm &&
      values.dropForm.drops &&
      values.dropForm.amtPerDrop &&
      values.dropForm.lastDrop
    ) {
      let subFields = [
        "count1000",
        "count500",
        "count200",
        "count100",
        "count50",
        "count20",
        "count10",
        "count5",
        "count1",
        "count025",
      ];
      let vals = [1000, 500, 200, 100, 50, 20, 10, 5, 1, 0.25];
      let total = 0;
      vals.forEach((val, index) => {
        if (values.breakdown[subFields[index]]) {
          let currentVal =
            parseFloat(values.breakdown[subFields[index]]) * parseFloat(val);
          total += currentVal;
        }
      });
      if (parseFloat(total) !== parseFloat(values.dropForm.lastDrop)) {
        errors.breakdown = "Incorrect breakdown";
      }
    }
  };

  validatePumpInfo("pump1");
  validatePumpInfo("pump2");
  validatePumpInfo("pump3");
  validatePumpInfo("pump4");

  for (let i = 1; i < 5; i++) {
    validatePumpInfo(`pump${i}`);
    for (let j = 0; j < products.length; j++) {
      if (errors[`pump${i}`])
        if (errors[`pump${i}`][`${products[j]}`])
          if (!Object.keys(errors[`pump${i}`][`${products[j]}`]).length)
            errors[`pump${i}`] = undefined;
    }
  }

  const checkDupes = (el1, el2, fields) => {
    let count = 0;
    fields.forEach((field) => {
      if (el1[field] == el2[field]) count = count + 1;
    });
    console.log(count);
    return count === fields.length;
  };
  // returns error object (elErrors)
  const checkFieldArrayDuplicates = (fieldArr, fields, arrayErrorsHolder) => {
    if (fieldArr) {
      for (let i = 0; i < fieldArr.length; i++) {
        let elErrors = {};
        for (let j = i + 1; j < fieldArr.length; j++) {
          if (checkDupes(fieldArr[i], fieldArr[j], fields)) {
            fields.forEach(
              (field) => (elErrors = { ...elErrors, [field]: "Duplicate" })
            );
            arrayErrorsHolder[j] = elErrors;
          }
        }
      }
    }
    return;
  };
  if (values.expenses) {
    values.expenses.forEach((el, index) => {
      const elErrors = {};
      const subFields = ["catName", "description", "total"];
      subFields.forEach((subField) => {
        if (!el || !el[subField]) {
          elErrors[subField] = "Required";
          expensesArrayErrors[index] = elErrors;
        } else {
          if (
            subField === "total" &&
            parseFloat(el[subField]) > parseFloat(999999.99)
          ) {
            elErrors[subField] = "Invalid";
            expensesArrayErrors[index] = elErrors;
          }
        }
      });
    });
  }
  checkFieldArrayDuplicates(
    values.expenses,
    ["catName", "description"],
    expensesArrayErrors
  );
  if (values.cashadvance) {
    values.cashadvance.forEach((el, index) => {
      const elErrors = {};
      const subFields = ["employee", "amt"];
      subFields.forEach((subField) => {
        if (!el || !el[subField]) {
          elErrors[subField] = "Required";
          cashadvanceArrayErrors[index] = elErrors;
        } else {
          if (subField === "amt" && el[subField] > parseFloat(999999.99)) {
            elErrors[subField] = "Invalid";
            cashadvanceArrayErrors[index] = elErrors;
          }
        }
      });
    });
  }
  checkFieldArrayDuplicates(
    values.cashadvance,
    ["employee"],
    cashadvanceArrayErrors
  );
  if (values.creditsales) {
    values.creditsales.forEach((el, index) => {
      const elErrors = {};
      const subFields = ["companyName", "amount"];
      subFields.forEach((subField) => {
        if (!el || !el[subField]) {
          elErrors[subField] = "Required";
          creditsalesArrayErrors[index] = elErrors;
        } else {
          if (
            subField === "amount" &&
            parseFloat(el[subField]) > parseFloat(999999999.99)
          ) {
            elErrors[subField] = "Invalid";
            creditsalesArrayErrors[index] = elErrors;
          }
        }
      });
    });
  }

  if (expensesArrayErrors.length) errors.expenses = expensesArrayErrors;

  if (cashadvanceArrayErrors.length)
    errors.cashadvance = cashadvanceArrayErrors;

  if (creditsalesArrayErrors.length)
    errors.creditsales = creditsalesArrayErrors;

  if (pumpAttendantsArrayErrors.length)
    errors.pumpAttendants = pumpAttendantsArrayErrors;
  if (JSON.stringify(errors) === "{}") {
    alert("There were no errors");
    return undefined;
  }
  return errors;
};
export default validate;
