import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import ShoppingBasket from "@material-ui/icons/ShoppingBasket"
import { connect } from "react-redux"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import validate from "../../../../shared/validate"
import { reduxForm } from "redux-form"
import { Grid } from "@material-ui/core"
import BookIcon from "@material-ui/icons/Book"
import AssessmentIcon from "@material-ui/icons/Assessment"
import MoneyIcon from "@material-ui/icons/Money"
import { useHistory, Redirect } from "react-router-dom"
import Skeleton from "@material-ui/lab/Skeleton"
import {
  fetchEmployees,
  changeActiveTabNav,
  closeForm,
  fetchFormInitialValues,
} from "../../../../../actions"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography comonent={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "80%",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    flexShrink: 0,
  },
}))
function ShiftReport(props) {
  const {
    closeForm,
    items,
    activeTab,
    changeActiveTabNav,
    openedForm,
    fetchFormInitialValues,
    fetchEmployees,
    employees,
    initialValuesState
  } = props
  const classes = useStyles()
  const history = useHistory()
  const dateFormat = require("dateformat")
  useEffect(() => {
    // Redirect if openedForm is null
    if (!openedForm.fId) history.push("/addreport")
    // Fetch employees
    // Fetch init form values from server

    if (openedForm.fId) {
      fetchEmployees()
      console.log("init form")
      fetchFormInitialValues(openedForm.fId, openedForm)
    }
    // on unmount close form
    return () => {
      closeForm()
      console.log("closed form")
    }
  }, [])

  if (employees.error || initialValuesState.error) {
    return (
      <Redirect
        to={{
          pathname: "/error-page",
          state: {
            status: employees.error.status,
            data: employees.error.data,
          },
        }}
      />
    )
  } else if (
    employees.loading ||
    employees.results === null ||
    initialValuesState.loading ||
    initialValuesState.results === null
  ) {
    return (
      <Skeleton animation='wave' style={{ width: "100%", height: "100%" }} />
    )
  } else {
    const handleChange = (event, newValue) => {
      changeActiveTabNav(newValue)
    }
    const formInfo = () => {
      if (openedForm.date) {
        const d = new Date(openedForm.date)
        const date = dateFormat(d, "isoDate")
        return (
          <div>
            <h1>{openedForm.shift}</h1>
            <h1>{date}</h1>
          </div>
        )
      }
      return <></>
    }
    return (
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: "100vh" }}>
        <div className={classes.root}>
          {formInfo()}
          <AppBar position='static' color='default'>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              // variant='scrollable'
              scrollButtons='on'
              indicatorColor='primary'
              textColor='primary'
              aria-label='scrollable force tabs example'
              centered>
              <Tab
                label='Basic Shift Info'
                icon={<BookIcon />}
                {...a11yProps(0)}
              />
              <Tab
                label='Advance Reading'
                icon={<AssessmentIcon />}
                {...a11yProps(1)}
              />
              <Tab
                label='Dipstick Reading'
                icon={<AssessmentIcon />}
                {...a11yProps(2)}
              />
              <Tab label='Drop Form' icon={<MoneyIcon />} {...a11yProps(3)} />
              <Tab
                label='Withdrawals'
                icon={<ShoppingBasket />}
                {...a11yProps(4)}
              />
            </Tabs>
          </AppBar>
          <TabPanel className={classes.tab} value={activeTab} index={0}>
            {items[0]}
          </TabPanel>
          <TabPanel className={classes.tab} value={activeTab} index={1}>
            {items[1]}
          </TabPanel>
          <TabPanel className={classes.tab} value={activeTab} index={2}>
            {items[2]}
          </TabPanel>
          <TabPanel className={classes.tab} value={activeTab} index={3}>
            {items[3]}
          </TabPanel>
          <TabPanel className={classes.tab} value={activeTab} index={4}>
            {items[4]}
          </TabPanel>
        </div>
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    activeTab: state.activeTabNav,
    employees: state.employees,
    openedForm: state.openedForm,
    initialValues: state.formInitialValues.results,
    initialValuesState: state.formInitialValues,
  }
}

export default connect(mapStateToProps, {
  fetchEmployees,
  changeActiveTabNav,
  closeForm,
  fetchFormInitialValues,
})(
  reduxForm({
    form: "shiftForm", // a unique identifier for this form
    validate,
  })(ShiftReport)
)
