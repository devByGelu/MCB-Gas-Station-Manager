import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class TodayReminder extends Component {
  render() {
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
                    class='btn btn-primary btn-lg btn-block'
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
                    class='btn btn-primary btn-lg btn-block'
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
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TodayReminder)
