import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../ui/Backdrop/Backdrop'

import classes from './Drawer.module.css'

export default class Drawer extends Component {
  render() {
    if (!this.props.isOpen) {
      return null
    }

    let links = [{ to: '/', label: 'Список', exact: true }]

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать', exact: false })
      links.push({ to: '/logout', label: 'Выйти', exact: false })
    } else {
      links.push({ to: '/auth', label: 'Авторизация', exact: false })
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
