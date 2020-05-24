import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { registerMainFormNavLinks } from '../../../../actions/index'
import { toggleMainFormNavLink } from '../../../../actions/index'
export const MainFormNav = (props) => {
  useEffect(() => {
    props.registerMainFormNavLinks(props.labels)
  }, [])

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
            onClick={props.clickHandler}
          >
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
      console.log(props.registeredMainFormNavLinks)
      const activeMainFormNavLink = props.registeredMainFormNavLinks.find(
        (link) => link.isActive === true
      )
      let componentIndex = props.labels.findIndex(
        (label) => activeMainFormNavLink.label === label
      )
      /* return props.items.map((component, index) => {
        const isHidden = componentIndex === index ? '' : 'd-none'
        return <div className={isHidden}>{component}</div>
      }) */
      console.log(props.items[componentIndex])
      return props.items[componentIndex]
    }
  }
  return (
    <div className='container'>
      <div class='card text-center'>
        <div class='card-header'>
          <ul class='nav nav-pills card-header-pills'>{navItems()}</ul>
        </div>

        <div class='card-body'>{activeForm()}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainFormNav)
