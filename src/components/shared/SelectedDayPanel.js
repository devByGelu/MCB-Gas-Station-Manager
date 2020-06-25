import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { CardHeader } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import DaysList from "../pages/AddShiftReport/DaysList"
import HorizontalLinearStepper from "../pages/AddShiftReport/HorizontalLinearStepper"
import Paper from "@material-ui/core/Paper"
import ShiftSummaryPanel from "../pages/AddShiftReport/ShiftSummaryPanel"
import { connect } from "react-redux"
import Skeleton from "@material-ui/lab/Skeleton"
import {
  changeSelectedDay,
  postFormRequest,
  fetchMonthForms,
  openForm,
  changeSelectedDaySelectedForm,
} from "../../actions"
import { useHistory } from "react-router-dom"
const dateFormat = require("dateformat")

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  cardHeaderTab: {
    fontColor: "white",
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
    changeSelectedDaySelectedForm,
    openForm,
    openedForm,
    createForm,
    createFormStatus,
    title,
    content,
    children,
    monthForms,
    selectedDay,
    changeSelectedDay,
    selectedDaySelectedForm,
    fetchMonthForms,
  } = props
  const classes = useStyles()
  const history = useHistory()
 
  if(openedForm.fId)
    history.push('/addreport/new')
  if (monthForms.error == null && !monthForms.loading && !monthForms.results)
    return <>init</>
  else if (monthForms.error !== null) return <>Error</>
  else if (monthForms.loading) return <Skeleton animation='wave' />
  else {
    // if (createFormStatus.error == null && !createFormStatus.loading && !createFormSdatus.results)
    //   return <>init</>
    if (createFormStatus.error !== null || createFormStatus.error !== null)
      return <>Error</>
    else if (createFormStatus.loading)
      return (
        <>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation='wave' />
        </>
      )
    else {
      // Init selected day to first el in monthForms
      let sameDateForms = []
      for (let i = 0 ; i < monthForms.results.length; i++) {
        const d = new Date(monthForms.results[i].date)
        const elDay = d.getDate()
        if (selectedDay == elDay) {
          sameDateForms.push(monthForms.results[i]) 
        }
      }
      const activeForm = sameDateForms[selectedDaySelectedForm]
      const handleClick = () => {
        const placement = 1
        const eId = 2
        const shift = 'AM'
        createForm(monthForms.year, monthForms.month, selectedDay, placement, eId,shift)
      }
      const renderHeader = () => {
        const d = new Date(`${monthForms.year}-${monthForms.month}-${selectedDay}`)
        return dateFormat(d,'dddd, mmmm d') 
      } 

      return (
        <Card className={classes.root} variant='outlined'>
          <CardHeader
            title={
              <Typography className={classes.title} color='textPrimary'  component={'span'}>
                <div className={classes.cardHeaderText}>{renderHeader()}</div>
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
                  <Grid item md={12}>
                    <Paper elevation={3}>
                      <HorizontalLinearStepper
                        sameDateForms={sameDateForms}
                        selectedDaySelectedForm={selectedDaySelectedForm}
                      />
                    </Paper>
                  </Grid>
                  <Grid item md={12}>
                    <Paper elevation={3}>
                      <ShiftSummaryPanel activeForm={activeForm} />
                    </Paper>
                  </Grid>
                </>
              ) : (
                <>
                  <Button onClick={handleClick}>Create Form</Button>
                </>
              )}
            </Grid>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    monthForms: state.monthForms,
    selectedDay: state.selectedDay,
    selectedDaySelectedForm: state.selectedDaySelectedForm,
    createFormStatus: state.createFormStatus,
    openedForm: state.openedForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createForm: (year, month, day, placement, eId,shift) =>
      dispatch(postFormRequest(year, month, day, placement, eId,shift)),
    fetchMonthForms: (year, month) => dispatch(fetchMonthForms(year, month)),
    openForm: (form)=> dispatch(openForm(form))
    ,changeSelectedDaySelectedForm: (index)=>dispatch(changeSelectedDaySelectedForm(index))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectedDayPanel)
