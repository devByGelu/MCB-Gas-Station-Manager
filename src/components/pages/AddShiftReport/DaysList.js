import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star'
import nextId from "react-id-generator";
import  DaysListItem  from './DaysListItem'
import Skeleton from '@material-ui/lab/Skeleton';
import { fetchFormMonth, fetchMonthForms } from '../../../actions'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
}))
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate()
}
function DaysList(props) {
  const { month, year, fetchMonthForms, monthForms } = props
  const dayLength = daysInMonth(month, year)
  let days = []
  for (let index = 0; index < dayLength; index++) days.unshift(index + 1)
  const classes = useStyles()

  const shiftHasAMPM = (day, month, year) => {
    let hasAM = monthForms.results.find((el) => {
      const d = new Date(el.date)
      const elDay = d.getDate() == day
      const elMonth = d.getMonth() + 1 == month
      const elYear = d.getFullYear() == year
      const isAM = el.shift === 'AM'
      return elDay && elMonth && elYear && isAM
    })
    let hasPM = monthForms.results.find((el) => {
      const d = new Date(el.date)
      const elDay = d.getDate() == day
      const elMonth = d.getMonth() + 1 == month
      const elYear = d.getFullYear() == year
      const isAM = el.shift === 'PM'
      return elDay && elMonth && elYear && isAM
    })
    if (hasAM && hasPM) return 'complete'
    else if (hasAM || hasPM) return 'incomplete'
    else return 'none'
  }
  useEffect(() => {
    fetchMonthForms(year, month)
  }, [year, month, ])
  if (monthForms.error == null && !monthForms.loading && !monthForms.results)
    return <>init</>
  else if (monthForms.error !== null || monthForms.error !==null) return <>Error</>
  else if (monthForms.loading)
    return (
      <>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation='wave' />
      </>
    )
  else
    return (
      <List
        component='nav'
        className={classes.root}
        aria-label='contacts'
        style={{ overflow: 'auto', maxHeight: 320, overflowX: 'hidden' }}>
        {days.map((day) => (
          <DaysListItem
            key={nextId()}
            day={day}
            month={month}
            year={year}
            completionState={shiftHasAMPM(day, month, year)}
          />
        ))}
      </List>
    )
}
const mapStateToProps = (state) => {
  return {
    monthForms: state.monthForms,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMonthForms: () =>
      dispatch(fetchMonthForms(ownProps.year, ownProps.month)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DaysList)
