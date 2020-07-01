import React from 'react'
import ClippedDrawer from './pages/ShiftForm/ClippedDrawer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import 'fontsource-roboto';
import DashBoard from './pages/AddShiftReport/AddShiftReport'
import Form from './pages/ShiftForm/Form'
import ErrorPage from './shared/ErrorPage/ErrorPage'
import AdvanceReadingForm from './pages/ShiftForm/AdvanceReadingForm/AdvanceReadingForm'
import DipstickReadingForm from './pages/ShiftForm/DipstickReadingForm/DipstickReadingForm'
import DropForm from './pages/ShiftForm/DropForm/DropForm'
import ExpensesForm from './pages/ShiftForm/ExpensesForm/ExpensesForm'
import submitGroup2 from './shared/submitGroup2'
import submitGroup1 from './shared/submitGroup1'
import submitGroup3 from './shared/submitGroup3'
import submitGroup4 from './shared/submitGroup4'
import submitGroup5 from './shared/submitGroup5'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import ShiftReport from './pages/ShiftForm/MainForm/MainTabNav/ShiftReport'
import Report from './pages/AddShiftReport/ShiftReport/ShiftReport'
const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ClippedDrawer>
          {/* <Switch>
            <Route
              path='/addreport/new'
              render={(props) => (
                <ShiftReport
                  items={[
                    <Form onSubmit={submitGroup1} />,
                    <AdvanceReadingForm onSubmit={submitGroup2} />,
                    <DipstickReadingForm onSubmit={submitGroup3} />,
                    <DropForm onSubmit={submitGroup4} />,
                    <ExpensesForm onSubmit={submitGroup5} />,
                  ]}
                  {...props}
                />
              )}
            />
            <Route path='/addreport' exact component={DashBoard} />
            <Route
              path='/error-page'
              render={(props) => <ErrorPage {...props} />}
            />
          </Switch> */}
          <Report/>
        </ClippedDrawer>
      </ThemeProvider>
      
    </Router>
  )
}

export default App
