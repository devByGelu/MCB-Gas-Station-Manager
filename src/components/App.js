import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './shared/Navigation Bar/NavBar'
import DashBoard from './pages/SettleReport/DashBoard'
import Form from './pages/ShiftForm/Form'
import ErrorPage from './shared/ErrorPage/ErrorPage'
import MainFormNav from './pages/ShiftForm/MainForm/MainFormNav'
import AdvanceReadingForm from './pages/ShiftForm/AdvanceReadingForm/AdvanceReadingForm'
import DipstickReadingForm  from './pages/ShiftForm/DipstickReadingForm/DipstickReadingForm'
import DropForm from './pages/ShiftForm/DropForm/DropForm'
import ExpensesForm from './pages/ShiftForm/ExpensesForm/ExpensesForm'
import submitGroup2 from './shared/submitGroup2'
import submitGroup1 from './shared/submitGroup1'
import submitGroup3 from './shared/submitGroup3'
import submitGroup4 from './shared/submitGroup4'
import submitGroup5 from './shared/submitGroup5'

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
                <Form onSubmit={submitGroup1}/>,
                <AdvanceReadingForm  onSubmit={submitGroup2}/>,
                <DipstickReadingForm onSubmit={submitGroup3}/>,
                <DropForm onSubmit={submitGroup4}/>,
                <ExpensesForm onSubmit={submitGroup5}/>,
              ]}
              labels={[
                'ShiftForm',
                'Advance Reading',
                'Dipstick Reading',
                'Drop Form',
                'Withdrawals',
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
