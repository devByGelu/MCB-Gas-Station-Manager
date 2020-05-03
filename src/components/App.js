import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './shared/Navigation Bar/NavBar'
import DashBoard from './pages/SettleReport/DashBoard'
import Form from './pages/ShiftForm/Form'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/addreport/new' component={Form} />
        <Route path='/addreport' exact component={DashBoard} />
      </Switch>
    </Router>
  )
}

export default App
