import React, { Component } from "react" 
import Grid from "@material-ui/core/Grid"
import SelectedDayPanel from "../../shared/SelectedDayPanel"
import { connect } from "react-redux"
import TodayReminder from "../../shared/TodayReminder/TodayReminder"
import PreviousReminder from "../../shared/PreviousReminder/PreviousReminder"
// import OutlinedCard from '../../shared/DaysListPanel'
import DaysList from "./DaysList"
import DaysListPanel from "../../shared/DaysListPanel"
const dateFormat = require("dateformat")
const AddShiftReport = (props) => {
  return (
    <Grid container justify='center' spacing={2} alignItems='flex-start'>
      <Grid item md={4}>
        <DaysListPanel />
      </Grid>

      <Grid item md={8}>
        <SelectedDayPanel />
      </Grid>
    </Grid>
  )
}


export default connect(null, null)(
  AddShiftReport
)
