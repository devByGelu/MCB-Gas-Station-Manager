import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { registerMainFormNavLinks } from '../../../../actions/index'
import { toggleMainFormNavLink } from '../../../../actions/index'
// import submit from '../../../shared/submit'
import { reduxForm } from 'redux-form'
// import RemoteSubmitButton from '../../../shared/RemoteSubmitButton'
import validate from '../../../shared/validate'
import submitGroup1 from '../../../shared/submitGroup1'
import Submitgroup1Btn from '../../../shared/Submitgroup1Btn'
import submitGroup2 from '../../../shared/submitGroup2'
import submit from '../../../shared/submit'
import store from '../../../../store'
import { Form } from '../Form'
import AdvanceReadingForm from '../AdvanceReadingForm/AdvanceReadingForm'
import { DipstickReadingForm } from '../DipstickReadingForm/DipstickReadingForm'
import DropForm from '../DropForm/DropForm'
import ExpensesForm from '../ExpensesForm/ExpensesForm'

export const MainFormNav = (props) => {

  useEffect(() => {
    props.registerMainFormNavLinks(props.labels)
  }, [])
  const { onSubmit } = props
  const navItems = () =>
    props.registeredMainFormNavLinks.map((link) => {
      let isActive = link.isActive
        ? 'btn btn-outline-info active mr-1 mb-2'
        : 'btn btn-outline-info mr-1 mb-1 '
      return (
        <li class='nav-item'>
          <button
            name={link.label}
            type='button'
            class={isActive}
            onClick={props.clickHandler}>
            {link.label}
          </button>
        </li>
      )
    })
  const activeForm = () => {
    if (
      props.registeredMainFormNavLinks === undefined ||
      props.registeredMainFormNavLinks === null
    )
      return props.items[0]
    else {

      let componentIndex = props.registeredMainFormNavLinks.findIndex(
        (link) => link.isActive === true
      )

      return props.items[componentIndex]
    }
  }
  return (
    <div className='container'>
      <div class='card text-center'>
        <div class='card-header'>
          <ul class='nav nav-pills card-header-pills'>{navItems()}</ul>
        </div>

        <div class='card-body'>
          {activeForm()}
          {/* <RemoteSubmitButton/> */}
          {/* <Submitgroup1Btn /> */}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    registeredMainFormNavLinks: state.registeredMainFormNavLinks,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerMainFormNavLinks: (labels) =>
      dispatch(registerMainFormNavLinks(labels)),
    clickHandler: (e) => dispatch(toggleMainFormNavLink(e.target.name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'shiftForm', // a unique identifier for this form
    validate,
  })(MainFormNav)
)
