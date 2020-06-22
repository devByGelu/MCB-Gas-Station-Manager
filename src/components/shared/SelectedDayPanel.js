import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardHeader } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import DaysList from '../pages/AddShiftReport/DaysList'
import HorizontalLinearStepper from '../pages/AddShiftReport/HorizontalLinearStepper'
import Paper from '@material-ui/core/Paper'
import ShiftSummaryPanel from '../pages/AddShiftReport/ShiftSummaryPanel'
import { connect } from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'
import { changeSelectedDay } from '../../actions'
const dateFormat = require('dateformat')

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  cardHeaderTab: {
    fontColor: 'white',
    background: theme.palette.background.default,
    maxHeight: 40,
  },
  cardHeaderText: {
    // fontSize: 15,
    // textAlign: 'right',
    // paddingRight: 200,
    color: theme.palette.primary.contrastText,
  },
}))

function SelectedDayPanel(props) {
  const {
    title,
    content,
    children,
    monthForms,
    selectedDay,
    changeSelectedDay,
    activeFormPlacement,
  } = props
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  if (monthForms.error == null && !monthForms.loading && !monthForms.results)
    return <>init</>
  else if (monthForms.error !== null) return <>Error</>
  else if (monthForms.loading)
    return (
      <>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation='wave' />
      </>
    )
  else {
    // Init selected day to first el in monthForms
    let sameDateForms = [{}, {}, {}, {}, {}, {}, {}]
    for (let i = 0; i < monthForms.results.length; i++) {
      const d = new Date(monthForms.results[i].date)
      const elDay = d.getDate()
      console.log(selectedDay, 'is equal', elDay)
      if (selectedDay == elDay) {
        // console.log(selectedDay, 'is equal', elDay)
        sameDateForms[parseInt(monthForms.results[i].placement) - 1] =
          monthForms.results[i]
      }
    }
    const activeForm = sameDateForms.find(
      (f) => f.placement == activeFormPlacement
    )
    return (
      <Card className={classes.root} variant='outlined'>
        <CardHeader
          title={
            <Typography className={classes.title} color='textPrimary'>
              <div className={classes.cardHeaderText}>Shift Information</div>
            </Typography>
          }
          className={classes.cardHeaderTab}
        />
        <CardContent>
          <Grid
            container
            spacing={1}
            direction='row'
            justify='center'
            alignItems='flex-start'
            alignContent='center'
            //   wrap="nowrap"
          >
            {activeForm ? (
              <>
                <Grid item md={3}>
                  <Paper elevation={3}>
                    <HorizontalLinearStepper
                      forms={sameDateForms}
                      activeFormPlacement={activeFormPlacement}
                    />
                  </Paper>
                </Grid>
                <Grid item md={9}>
                  <Paper elevation={3}>
                    <ShiftSummaryPanel activeForm={activeForm} />
                  </Paper>
                </Grid>
              </>
            ) : (
              <>Forms not found</>
            )}
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monthForms: state.monthForms,
    selectedDay: state.selectedDay,
    activeFormPlacement: state.selectedDaySelectedForm,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, null)(SelectedDayPanel)
