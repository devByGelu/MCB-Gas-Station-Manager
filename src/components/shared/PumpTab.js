import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 151,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  label: {
    paddingLeft: 7,
    marginBottom: 20,
  },
  test: {
    textAlign: 'right',
    marginLeft: 20,
  },
}))

  function PumpTab({ pumpTabLabel, pumpNum }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    console.log(event.target)
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <>
      <Typography variant='overline' gutterBottom className={classes.test}>
        {pumpTabLabel}
      </Typography>

      <div className={classes.root}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}>
          <Tab label='Diesel' {...a11yProps(0)} />
          <Tab label='Accelrate' {...a11yProps(1)} />
          <Tab label='Jx Premium' {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
          <FieldArray
            component={renderSubFormFields}
            product={label}
            name={'pump' + pumpNum + 'Liters'}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </>
  )
}
const mapStateToProps = (state,ownProps) => {
  
}
export default connect(mapStateToProps,mapDispatchToProps)(PumpTab)