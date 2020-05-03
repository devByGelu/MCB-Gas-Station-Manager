import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectShiftFormDate } from '../../../actions/index'
const today = new Date().toISOString().slice(0, 10)

const TodayReminder = (props) => {
  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>March 20 2020</h5>

          <div className='row'>
            <div className='col'>
              <h1>Morning</h1>
            </div>
            <div className='col'>
              <Link
                to='/addreport/new'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <button
                  type='button'
                  className='btn btn-primary btn-lg btn-block'
                  onClick={() => props.selectShiftFormDate(today, 'AM')}
                >
                  Add
                </button>
              </Link>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <h1>Afternoon</h1>
            </div>
            <div className='col'>
              <Link
                to='/addreport/new'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <button
                  type='button'
                  className='btn btn-primary btn-lg btn-block'
                  onClick={() => props.selectShiftFormDate(today, 'PM')}
                >
                  Add
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { shiftFormDate: state.shiftFormDate }
}

export default connect(mapStateToProps, { selectShiftFormDate })(TodayReminder)
