import React, { Component } from 'react'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuToggle from '../../components/Navigation/MenuTogggle/MenuToggle'

import './Layout.css'

export default class Layout extends Component {
  state = {
    menu: false,
  }

  toggleMenuHandler = () => {
    this.setState({ menu: !this.state.menu })
  }

  closeMenu = () => {
    this.setState({ menu: false })
  }

  render() {
    return (
      <div className="Layout">
        <Drawer isOpen={this.state.menu} onClose={this.closeMenu} />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    )
  }
}
