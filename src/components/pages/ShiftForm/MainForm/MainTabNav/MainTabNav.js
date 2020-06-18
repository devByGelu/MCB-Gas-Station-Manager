import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import HelpIcon from '@material-ui/icons/Help'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import validate from '../../../../shared/validate'
import { reduxForm } from 'redux-form'
import { Grid } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MoneyIcon from '@material-ui/icons/Money';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    backgroundColor: theme.palette.background.paper,
  },
  tab:{
    flexShrink: 0
  }
}))

function MainTabNav(props) {
  const { items } = props
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
      <div className={classes.root}>

<AppBar position='static' color='default'>
  <Tabs
    
    value={value}
    onChange={handleChange}
    // variant='scrollable'
    scrollButtons='on'
    indicatorColor='primary'
    textColor='primary'
    aria-label='scrollable force tabs example'
    centered
    >
    <Tab label='Basic Shift Info' icon={<BookIcon />} {...a11yProps(0)} />
    <Tab label='Advance Reading' icon={<AssessmentIcon />} {...a11yProps(1)} />
    <Tab label='Dipstick Reading' icon={<AssessmentIcon />} {...a11yProps(2)} />
    <Tab label='Drop Form' icon={<MoneyIcon />} {...a11yProps(3)} />
    <Tab label='Withdrawals' icon={<AccountBalanceWalletIcon />} {...a11yProps(4)} />
  </Tabs>
</AppBar>
<TabPanel className={classes.tab} value={value} index={0}>
  {items[0]}
</TabPanel>
<TabPanel className={classes.tab} value={value} index={1}>
  {items[1]}
</TabPanel>
<TabPanel className={classes.tab} value={value} index={2}>
  {items[2]}
</TabPanel>
<TabPanel className={classes.tab} value={value} index={3}>
  {items[3]}
</TabPanel>
<TabPanel className={classes.tab} value={value} index={4}>
  {items[4]}
</TabPanel>
</div>

  </Grid> 

  )
}
export default connect(
  null,
  null
)(
  reduxForm({
    form: 'shiftForm', // a unique identifier for this form
    validate,
  })(MainTabNav)
)
