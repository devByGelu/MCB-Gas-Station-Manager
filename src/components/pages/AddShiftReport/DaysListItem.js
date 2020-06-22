import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import BeenhereIcon from '@material-ui/icons/Beenhere'
import FormAPI from '../../../apis/FormAPI'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { changeSelectedDay } from '../../../actions'
import { changeSelectedDaySelectedForm } from '../../../actions'
const dateFormat = require('dateformat')

const DaysListItem = ({
  day,
  month,
  year,
  completionState,
  changeSelectedDay,
  resetSelectedDaySelectedForm
}) => {
  const dayToday = dateFormat(new Date(), 'd')
  const prefix =
    day == '1' || day == '31'
      ? 'st'
      : day == '2' || day == '22'
      ? 'nd'
      : day == '3' || day == '23'
      ? 'rd'
      : 'th'

  const item = (day, dayToday) => {
    const listItemIcon = (completionState) =>
      completionState === 'complete' ? (
        <FiberManualRecordIcon style={{ fill: 'green' }} />
      ) : completionState === 'incomplete' ? (
        <FiberManualRecordIcon style={{ fill: 'yellow' }} />
      ) : (
        <FiberManualRecordIcon color='action' />
      )

    if (day <= dayToday)
      return (
        <ListItem
          button
          onClick={() => {
            changeSelectedDay(day)
            resetSelectedDaySelectedForm()
          }}>
          <ListItemIcon>{listItemIcon(completionState)}</ListItemIcon>
          <ListItemText primary={`${day}${prefix}`} />
        </ListItem>
      )
    else return <></>
  }
  return item(day, dayToday)
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeSelectedDay: (day) => dispatch(changeSelectedDay(day)),
    resetSelectedDaySelectedForm: () =>
      dispatch(changeSelectedDaySelectedForm(1)),
  }
}
export default connect(null, mapDispatchToProps)(DaysListItem)
