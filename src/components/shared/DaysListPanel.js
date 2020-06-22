import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardHeader } from '@material-ui/core'
import DaysList from '../pages/AddShiftReport/DaysList'

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

export default function DaysListPanel(props) {
  const { title, content, children } = props
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.root} variant='outlined'>
      <CardHeader
        title={
          <Typography className={classes.title} color='textPrimary'>
            <div className={classes.cardHeaderText} >
              {dateFormat(new Date(), 'mmmm yyyy')}
            </div>
          </Typography>
        }
        className={classes.cardHeaderTab}
      />
      <CardContent>
        {/* <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom>
          {title}
        </Typography> */}
        {/* {children} */}
        <DaysList
          month={dateFormat(new Date(), 'm')}
          year={dateFormat(new Date(), 'yyyy')}
        />
        {/* <Typography variant='h5' component='h2'>
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          adjective
        </Typography>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
        {/* </Typography> */}
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}
