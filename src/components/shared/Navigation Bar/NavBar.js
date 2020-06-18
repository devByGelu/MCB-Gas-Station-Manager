import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link
          to='/home'
          style={{ color: 'inherit', textDecoration: 'inherit' }}
          className='navbar-brand'>
          MCB
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item dropdown'>
              <Link
                to='/addreport'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
                className='nav-link dropdown-toggle'
                id='navbarDropdownMenuLink'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                Reports
              </Link>

              <div
                className='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'>
                <Link
                  to='/addreport'
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  className='dropdown-item'>
                  Add
                </Link>

                <Link
                  to='/xD'
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  className='dropdown-item'>
                  Summary
                </Link>
              </div>
            </li>

            <li className='nav-item'>
              <Link to='/xD' className='nav-link'>
                Features
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
