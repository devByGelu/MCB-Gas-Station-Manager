import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './shared/Navigation Bar/NavBar'
import DashBoard from './pages/SettleReport/DashBoard'
import Form from './pages/ShiftForm/Form'
import ErrorPage from './shared/ErrorPage/ErrorPage'
import MainFormNav from './pages/ShiftForm/MainForm/MainFormNav'
import AdvanceReadingForm from './pages/ShiftForm/AdvanceReadingForm/AdvanceReadingForm'
import { DipstickReadingForm } from './pages/ShiftForm/DipstickReadingForm/DipstickReadingForm'
import DropForm from './pages/ShiftForm/DropForm/DropForm'
import ExpensesForm from './pages/ShiftForm/ExpensesForm/ExpensesForm'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <Route path='/addreport/new' component={Form} /> */}
        <Route
          path='/addreport/new'
          render={(props) => (
            <MainFormNav
              items={[
                <Form />,
                <AdvanceReadingForm />,
                <DipstickReadingForm />,
                <DropForm />,
                <ExpensesForm />,
              ]}
              labels={[
                'ShiftForm',
                'Advance Reading',
                'Dipstick Reading',
                'Drop Form',
                'Expenses',
              ]}
              {...props}
            />
          )}
        />
        {/* <Route path='/addreport/new' component={Form} /> */}
        <Route path='/addreport' exact component={DashBoard} />
        <Route
          path='/error-page'
          render={(props) => <ErrorPage {...props} />}
        />
      </Switch>
    </Router>
  )
}

export default App
