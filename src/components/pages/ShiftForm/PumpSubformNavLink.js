import React from 'react'
import { connect } from 'react-redux'
import {
  selectPump1ActiveNavLink,
  selectPump2ActiveNavLink,
  selectPump3ActiveNavLink,
  selectPump4ActiveNavLink,
} from '../../../actions/index'

export const PumpSubformNavLink = (props) => {

  if (props.isClickAble) {
    const buttonState = props.activeNavLink === props.label ? 'btn btn-outline-secondary mr-1 mb-1 active':'btn btn-outline-secondary mr-1 mb-1'
    return (
      <li class='nav-item'>
        <button
          type='button'
          class={buttonState}
          onClick={() => props.clickHandler()}
        >
          {props.label}
        </button>
      </li>
    )
  } else
    return (
      <li class='nav-item'>
        <a class='nav-link'>
          <strong>{'Pump ' + props.label}</strong>
        </a>
      </li>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if (!ownProps.isClickAble) return {}
  else {
    if (ownProps.pumpNumber == 1)
      return {
        clickHandler: () => dispatch(selectPump1ActiveNavLink(ownProps.label)),
      }
    else if (ownProps.pumpNumber == 2)
      return {
        clickHandler: () => dispatch(selectPump2ActiveNavLink(ownProps.label)),
      }
    else if (ownProps.pumpNumber == 3)
      return {
        clickHandler: () => dispatch(selectPump3ActiveNavLink(ownProps.label)),
      }
    else
      return {
        clickHandler: () => dispatch(selectPump4ActiveNavLink(ownProps.label)),
      }
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.isClickAble) return {}
  else {
    if (ownProps.pumpNumber == 1)
      return {
        activeNavLink: state.pump1ActiveNavLink.product,
      }
    else if (ownProps.pumpNumber == 2)
      return {
        activeNavLink: state.pump2ActiveNavLink.product,
      }
    else if (ownProps.pumpNumber == 3)
      return {
        activeNavLink: state.pump3ActiveNavLink.product,
      }
    else
      return {
        activeNavLink: state.pump4ActiveNavLink.product,
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PumpSubformNavLink)
