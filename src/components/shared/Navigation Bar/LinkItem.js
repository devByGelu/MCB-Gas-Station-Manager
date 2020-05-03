import React, { Component } from 'react'
import { connect } from 'react-redux'

export const LinkItem = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LinkItem)
