import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import BookIcon from '@material-ui/icons/Book'
import AssessmentIcon from '@material-ui/icons/Assessment'
import MoneyIcon from '@material-ui/icons/Money'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { openForm } from '../../../actions'

const ShiftSummaryPanel = ({ activeForm,openForm }) => {
  const history = useHistory();
  const theme = useTheme();
  const indicators = [
    'attendance_form_fId',
    'advance_reading_form_fId',
    'dipstick_reading_form_fId',
    'drop_form_fId',
    'expense_form_fId',
  ]

  const itemTexts = [
    'Basic Shift Information',
    'Advance Reading',
    'Dipstick Reading',
    'Drop Form',
    'Withdrawals',
  ]
  const isSettled = (index) => (
    activeForm[indicators[index]] !== null
  )
  const icons = [
    <BookIcon color={isSettled(0) ? 'primary':''}/>,
    <AssessmentIcon color={isSettled(1) ? 'primary':''}/>,
    <AssessmentIcon color={isSettled(2) ? 'primary':''}/>,
    <MoneyIcon color={isSettled(3) ? 'primary':''}/>,
    <ShoppingBasket color={isSettled(4) ? 'primary':''}/>,
  ]
  const item = (isSettled, indicator) => {
    const icon = isSettled ? (
      <EditIcon fontSize='large' color='primary' />
      ) : (
        <AddCircleIcon fontSize='large' />
        )
    const handleClick = () => {
      openForm()
      history.push("/addreport/new");
    }
    return (
      <ListItemSecondaryAction>
        <IconButton edge='end'onClick={handleClick}>{icon}</IconButton>
      </ListItemSecondaryAction>
    )
  }
  return activeForm ? (
    <>
      <Grid container direction='row' justify='center' wrap='nowrap'>
        <List style={{ width: '100%' }}>
          {itemTexts.map((text, index) => (
            <ListItem key={index} role={undefined} dense>
              <ListItemIcon style={isSettled(index) ? {color: theme.palette.primary.main}:{}}>{icons[index]}</ListItemIcon>
              <ListItemText
                id={index}
                primary={text}
                secondary={isSettled(index) ? 'settled':'unsettled'}
                secondaryTypographyProps={isSettled(index) ? { variant: "overline", color:'secondary'}:{ variant: "overline"}}
                
              />
              {item(
                isSettled(index),
                activeForm[indicators[index]]
              )}
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  ) : (
    <>Create a form</>
  )
}

ShiftSummaryPanel.propTypes = {
  prop: PropTypes,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch,ownProps)=>{
  return {
    openForm: ()=>dispatch(openForm(ownProps.activeForm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftSummaryPanel)
