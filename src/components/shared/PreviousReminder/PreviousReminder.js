import React, { Component } from 'react'
import { connect } from 'react-redux'

export class PreviousReminder extends Component {
  render() {
    return (
      <div>
        <div className='card'>
          <div className='card-body'>
            <button type='button' className='btn btn-primary mr-2 mb-2'>
              February 2020 <span className='badge badge-light'>9</span>
            </button>
            <button type='button' className='btn btn-primary mr-2 mb-2'>
              February 2020 <span className='badge badge-light'>9</span>
            </button>

            <button type='button' className='btn btn-primary mr-2 mb-2'>
              February 2020 <span className='badge badge-light'>9</span>
            </button>

            <button type='button' className='btn btn-primary mr-2 mb-2'>
              February 2020 <span className='badge badge-light'>9</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousReminder)
