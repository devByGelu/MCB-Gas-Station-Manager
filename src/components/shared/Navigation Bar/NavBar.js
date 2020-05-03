import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <a class='navbar-brand' href='#'>
          MCB Gas
        </a>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul class='navbar-nav'>
            <li class='nav-item dropdown'>
              <Link
                to='/addreport'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
                class='nav-link dropdown-toggle'
                id='navbarDropdownMenuLink'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Reports
              </Link>

              <div
                class='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'
              >
                <Link
                  to='/addreport'
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  class='dropdown-item'
                >
                  Add
                </Link>

                <Link
                  to='/xD'
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  class='dropdown-item'
                >
                  Summary
                </Link>
              </div>
            </li>

            <li class='nav-item'>
              <Link class='nav-link'>Features</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
