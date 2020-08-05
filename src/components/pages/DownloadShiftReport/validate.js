const validate = (values) => {
  const errors = {};
  if (!values.startDate) errors.startDate = "Required";
  if (!values.endDate) errors.endDate = "Required";
  if (values.startDate && values.endDate) {
    if (new Date(values.startDate) > new Date(values.endDate)) {
      errors.endDate = "Must be later/equal to starting date.";
    }
  }
  return errors;
};

export default validate;
