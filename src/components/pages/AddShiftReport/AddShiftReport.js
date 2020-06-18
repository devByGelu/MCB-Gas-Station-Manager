import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'

import TodayReminder from '../../shared/TodayReminder/TodayReminder'
import PreviousReminder from '../../shared/PreviousReminder/PreviousReminder'
import OutlinedCard from '../../shared/OutlinedCard'

export class AddShiftReport extends Component {
  render() {
    return (
      <Grid container justify='center' spacing={2}>
        <Grid item md={6}>
          <OutlinedCard title='Date Today'/>
        </Grid>

        <Grid item md={6}>
          <OutlinedCard title='27th'/>
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
