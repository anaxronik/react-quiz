import React from 'react'

import './Button.css'

const Button = (props) => {
  const classNames = ['Button', props.type]
  return (
    <button
      className={classNames.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
      {props.children}
    </button>
  )
}

export default Button
