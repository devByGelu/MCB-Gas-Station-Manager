import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import SelectedDayPanel from '../../shared/SelectedDayPanel'
import { connect } from 'react-redux'
import TodayReminder from '../../shared/TodayReminder/TodayReminder'
import PreviousReminder from '../../shared/PreviousReminder/PreviousReminder'
// import OutlinedCard from '../../shared/DaysListPanel'
import DaysList from './DaysList'
import DaysListPanel from '../../shared/DaysListPanel'
const dateFormat = require('dateformat')
export class AddShiftReport extends Component {
  render() {
    return (
      <Grid container justify='center' spacing={2} alignItems='flex-start'>
        <Grid item md={4}>
          <DaysListPanel />
        </Grid>

        <Grid item md={8}>
          <SelectedDayPanel />
          {/* <OutlinedCard title='27th' /> */}
        </Grid>
      </Grid>
      // <div className='jumbotron jumbotron-fluid'>
      //   <div className='container'>
      //     <h1 className='display-4'>You have unsettled Reports!</h1>
      //     <hr className='my-4' />
      //     <div className='row'>
      //       <div className='col'>
      //         <h1 className='font-weight-light'>Today</h1>
      //         <TodayReminder />
      //       </div>
      //       <div className='col'>
      //         <h1 className='font-weight-light'>Previous</h1>
      //         <PreviousReminder />
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddShiftReport)
