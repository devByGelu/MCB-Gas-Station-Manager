import React from 'react'
import PropTypes from 'prop-types'

const RenderErrors = ({direct, errors, errorMessages,message }) => {
  const renderErrors = () => {
    // console.log(errors)
    if (!direct && !message && errors.find((error) => error !== undefined))
      //   Render if at least one error
      return (
        <div class='alert alert-warning' role='alert'>
          <div className='text-left mt-0 mb-0'>
            <strong>Error</strong>
            <ul>
              {errors.map((error, index) => {
                if (error) {
                  return (
                    <li class='font-weight-light'>{errorMessages[index]}</li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
      )
    else if (message) return (
        <div class='alert alert-warning' role='alert'>
          <div className='text-left mt-0 mb-0'>
            <strong>Error</strong>
            <ul>
              {message}
            </ul>
          </div>
        </div>
      )
    else return <></>
  }
  return renderErrors()
}

export default RenderErrors
