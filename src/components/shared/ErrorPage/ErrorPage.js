import React from 'react'

const ErrorPage = (props) => {
  return (
    <div class='jumbotron jumbotron-fluid'>
      <div class='container'>
        <h1 class='display-4'>{props.location.state.status}</h1>
        <p class='lead'>{props.location.state.data}</p>
      </div>
    </div>
  )
}

export default ErrorPage
