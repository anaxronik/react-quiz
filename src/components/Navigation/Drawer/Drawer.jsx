import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../ui/Backdrop/Backdrop'

import classes from './Drawer.module.css'

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать', exact: false },
]

export default class Drawer extends Component {
  render() {
    if (!this.props.isOpen) {
      return null
    }

    return (
      <React.Fragment>
        <Backdrop onClick={this.props.onClose} />

        <nav className={classes.Drawer}>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  exact={link.exact}
                  activeClassName={classes.active}
                  onClick={this.props.onClose}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}
