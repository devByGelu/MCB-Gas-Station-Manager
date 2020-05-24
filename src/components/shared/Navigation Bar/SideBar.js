import React from 'react'
import { slide as Menu } from 'react-burger-menu'
const SideBar = (props) => {
  return (
    <Menu>
      <a id='home' href='/'>
        Home
      </a>
      <a id='about' href='/about'>
        About
      </a>
      <a id='contact' href='/contact'>
        Contact
      </a>
    </Menu>
  )
}

export default SideBar
