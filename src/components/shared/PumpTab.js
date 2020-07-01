import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import { connect } from "react-redux"
import { changeActivePanel } from "../../actions/index"
import PanelFields from "../pages/ShiftForm/PanelFields"
import { Field, FieldArray } from "redux-form"
import renderTextField from "./renderTextField"
import nextId from "react-id-generator"
function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 3,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 180,
  },
  tabs: {
    marginTop: 28,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  label: {
    paddingLeft: 7,
    marginBottom: 20,
  },
  gridItem: {
    marginBottom: 13,
  },
}))

function PumpTab(props) {
  const { pumpTabLabel, pumpNum, activePanel, changeActivePanel } = props
  const classes = useStyles()
  const labels = ["Diesel", "Accelrate", "JxPremium"]
  const handleChange = (event, newValue) => {
    changeActivePanel(pumpNum - 1, newValue)
  }
  let prefixes = ["END", "CAL", "MGN"]
  let products = ["Diesel", "Accelrate", "JxPremium"]
  if (pumpNum === "2" || pumpNum === "4")
    products = ["JxPremium", "Accelrate", "Diesel"]
  return (
    <Grid item container md>
      <div className={classes.root}>
        <Grid item>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            value={activePanel}
            onChange={handleChange}
            aria-label='Vertical tabs example'
            className={classes.tabs}>
            {products.map((label, index) => (
              <Tab key={nextId()} label={label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Grid>
        {/* Right */}

        <Grid item>
          {products.map((product, index) => (
            <Grid item container direction='column'>
              <TabPanel
                value={activePanel}
                index={index}
                className={classes.tabpanel}>
                <>
                  {prefixes.map((prefix) => (
                    <Grid item className={classes.gridItem}>
                      <Field
                        name={`pump${pumpNum}${product}${prefix}`}
                        component={renderTextField}
                        label={prefix}
                      />
                    </Grid>
                  ))}
                </>
              </TabPanel>
            </Grid>
          ))}
        </Grid>
        {/* <Typography variant='overline'>{pumpTabLabel}</Typography> */}
      </div>
    </Grid>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    activePanel: state.pumpTabs[ownProps.pumpNum - 1].active,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeActivePanel: (pumpNumIndex, active) =>
      dispatch(changeActivePanel(pumpNumIndex, active)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PumpTab)
