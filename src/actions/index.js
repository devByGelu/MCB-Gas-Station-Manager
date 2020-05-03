export const selectShiftFormDate = (selectedDate, selectedShift) => ({
  type: 'SHIFTFORM_DATE_SELECTED',
  payload: {
    date: selectedDate,
    shift: selectedShift,
  },
})

