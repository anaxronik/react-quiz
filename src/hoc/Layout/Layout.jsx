import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuToggle from '../../components/Navigation/MenuTogggle/MenuToggle'

import './Layout.css'

class Layout extends Component {
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
        <Drawer
          isOpen={this.state.menu}
          onClose={this.closeMenu}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

export default connect(mapStateToProps)(Layout)
